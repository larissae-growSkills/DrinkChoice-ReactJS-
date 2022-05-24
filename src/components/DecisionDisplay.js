import React from 'react';

const Modal = ({data}) => {
  return(
    <div className="flex bg-gray-600 bg-opacity-50 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
    <div className="relative my-6 mx-auto max-w-5xl">
      <div className="border-0 rounded-lg max-w-5xl shadow-lg relative flex justify-center w-full bg-white outline-none focus:outline-none">
        <div className="flex flex-col  mx-auto space-4 rounded-t ">
            <div class="p-2">
                    <button className="bg-transparent border-0 text-black float-right" onClick={() => window.location.reload()}>
                    <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-100 py-0 rounded-full">
                     x
                    </span>
                </button>
            </div>
            <hr/>
            <div class="p-4">
             <h3 class="text-2xl font=semibold">Your Result is:</h3>
          
            </div>
            <div class="relative p-4 flex justify-center">
              <h4 class="text-xl">{data.attributes.decision}</h4>
            </div>  
            <hr/> 
            <div class="flex flex-row-reverse ">
                
                <button class="bg-green-600 hover:bg-green-900 text-white my-2 mx-4 font-bold py-1 px-4 rounded-full shadow-md" onClick={() => window.location.reload()}>Ok</button>
            </div>      
        </div>
      
      </div>
     
    </div>
  </div>
  

  );
}

export default Modal;