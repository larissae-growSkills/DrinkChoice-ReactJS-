import React, {useEffect, useState } from 'react';
import authFetch from '../api';
import answers from '../model/Answers';
import Modal from './DecisionDisplay';





const FromData = () => {
    
    const[models, setModels] = useState([]);
    const[hide, setHidden] = useState(false);
    const [selectedModelData, setSelectedModelData] = useState([]);
    const [questions, setQuestions] = useState([]); 
    const [idSelected, setSelectedID] = useState("");
    const [input, setFormInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [responseDecision, setResponse] = useState({});
  

    //load all the models in the API
    const getModel =  async () => {
      const result = await authFetch.get('/v3/models');
      let array = [];
      array = result.data.data;
      setModels(array);      
    };

    //actions that happen when a model is selected from the dropdown
    const modelSelected = (e) => {
        let id = e.target.value;
        getSelectedModelData(id);
        setSelectedID(e.target.value);
        setHidden(true);

    };

    //load the questions from the selected model in the dropdown
    const getSelectedModelData = async (id) => {
        const result = await authFetch.get('/v3/models' + '/' + id);
        setSelectedModelData(result.data.data.attributes);
        setQuestions(result.data.data.attributes.metadata.attributes);
     };

     //get the answers from the inputs
     const getAnswers = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        
        if(e.target.type ==="number"){
            parseInt(value)        
        }
        else{
            value = e.target.value;
        }
     
        setFormInfo({ ...input,      
            [name]: value,
         })

     };
     
     //build the payload and get the decision
     const getDecision = async (e) =>{
        e.preventDefault();
        var data = {
            data: {
                type: "scenario",
                attributes:{
                    input
                },
            },
        };

       answers(data);
       const response = await authFetch.post('/v3/decision' + '/' + idSelected, JSON.stringify(data));
       setShowModal(true);
       setResponse(response.data.data);
     };

 

     // component mounted
     useEffect(() => {
        getModel();
     }, []);

   return(
        <div class="place-content-center" >
            {!hide
                ? <label class="block">
                    <span>Choose your questionnaire:</span>
                    <select class="w-80 block mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    onChange={modelSelected}
                    >
                        <option value="select">Select</option>
                        {models.map(model => 
                                <option value={model.id}  key={model.id} >{model.attributes.name}</option>
                        )}
                    </select>      
                </label>
                :<form onSubmit={getDecision}>
                    <h1 class="text-2xl text-slate-800">{selectedModelData.name}</h1>    
                    {questions.map(question =>
                            <div class="block">   
                                {(() => {
                                    switch(question.type) {
                                    case 'Continuous':
                                        return  (
                                            <label class="block my-6">          
                                                <span class="text-gray-700 text-xl">{question.question}</span>
                                                <input type="number" pattern="[0-9]*" placeholder="Enter a value" name={question.name} min={question.domain.lower} max={question.domain.upper} class="form-input rounded-md mt-1 block w-full" onChange={getAnswers}/>
                                            </label>   
                                        );
                                    case 'Nominal':
                                            return (
                                                <fieldset class="block my-6" >
                                                    <legend class="text-gray-700 text-xl">{question.question}</legend>
                                                        <div class="mt-2">
                                                              {question.domain.values.map((value) => 
                                                                <div>
                                                                <label class="inline-flex items-center">
                                                                    <input class="form-radio" type="radio" name={question.name} key={question.name} value={value} onChange={getAnswers}/>
                                                                    <span class="ml-2">{value}</span>
                                                                </label>
                                                                </div>
                                                               )}
                                                        </div>
                                                </fieldset>
                                            );
                                    default:
                                        break;
                                    }
                                })()}
                            </div> 
                    )} 
                 <div>
                   <button class="bg-blue-500 hover:bg-blue-700 text-white my-3 font-bold py-2 px-4 rounded-full">Submit</button>
                 </div>
                
                </form>
            }
            <div>
                 {showModal &&
                    <Modal 
                    onClose={true}
                    data={responseDecision}
                   />
                 }
             
            </div>
        </div>
      
   );

}

export default FromData
