
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center">Nuevo hilo</h2>
            <div className="flex gap-4">
              <button className="font-bold text-xl"><RiFileCopy2Line /></button>
              <button className="transform rotate-90 border-2 border-black rounded-full p-0.5 font-bold"><CiMenuKebab /></button>
            </div>
          </div>
        </section>
        {threads.map((thread, index) => (
          <section key={thread.id} className={`flex-1 ${thread.active ? "" : "opacity-50 pointer-events-none"}`}>
            <div className="flex justify-between items-center">
            <label className="flex items-center gap-4 -mb-6 pb-10"> <img className='rounded-full flex items-center gap-4 mb-2 pb-100 -ml-2 mt-2 z-10 w-12 h-12' src={user ? user.photoURL : null} alt="" /> {index === 0 || thread.showUser ? ( <h1>{user ? user.displayName : null}</h1> ) : ( <button className="ml-0 text-sm text-gray-400" onClick={() => handleAddThread(index)}>Agregar un hilo</button> )} </label> {index !== 0 && ( <button className="ml-0 text-sm" onClick={() => handleRemoveThread(index)}>X</button> )} </div>
          
            {thread.active && (
              <>
                <textarea
                  className="w-full border-l-2 ml-3 pl-6 outline-none focus:ring-0 resize-none"
                  placeholder={thread.placeholder}
                  value={thread.content}
                  onInput={(e) => handleInput(index, e)}
                  rows="1"
                  style={{ overflow: "hidden" }}
                ></textarea>
                {/* Previsualización de archivos */}
                <div className="preview-container">
                  {thread.files?.map((file, fileIndex) => (
                    <div key={fileIndex} className="relative my-2">
                      {file.type === "image" && (
                        <img src={file.preview} alt={file.name} className="w-full rounded-md" />
                      )}
                      {file.type === "video" && (
                        <video src={file.preview} className="w-full rounded-md" controls />
                      )}
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={() => handleRemoveFile(index, fileIndex)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <ModalButtons onButtonClick={(buttonId) => handleButtonClick(buttonId, index)} />
              </>
            )}
          </section>
        ))}
        <section className="flex justify-between items-center pt-4">
          <span className="text-sm text-gray-400">Cualquiera puede responder o citar</span>
          <button
            className={`px-4 py-2 rounded-lg ${
              isPublishEnabled ? "text-black font-bold" : "text-gray-400"
            }`}
            onClick={handlePublish}
            disabled={!isPublishEnabled}
          >
            Publicar
          </button>
        </section>
      </div>
    </div>
  );
};

export default Modal;

