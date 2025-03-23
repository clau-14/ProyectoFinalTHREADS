import ModalBotones from "./ModalBotones";

const Modal = ({ show, onClose, onPublish }) => {
  if (!show) return null;

  const { user } = useUserStore();
  const router = useRouter();
  const [threads, setThreads] = useState([
    { id: 1, active: true, placeholder: "¿Qué novedades tienes hoy?" },
    { id: 2, active: false, placeholder: "", showUser: false, content: "" },
  ]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Estado para archivos seleccionados
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/pagina1");
    }
  }, [user, router]);

  const handleInput = (index, event) => {
    const newThreads = [...threads];
    newThreads[index].content = event.target.value;
    setThreads(newThreads);

    const hasContent = newThreads.some((thread) => thread.content.trim() !== "");
    setIsPublishEnabled(hasContent);

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleFileSelect = (files) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]); // Agrega los archivos seleccionados al estado
  };

  const handlePublish = () => {
    const content = threads.map((thread) => thread.content).join("\n");
    const filesToPublish = Array.from(selectedFiles).map((file) => ({
      name: file.name,
      type: file.type,
    }));

    console.log("Contenido:", content);
    console.log("Archivos adjuntos:", filesToPublish);

    onPublish({ content, files: filesToPublish }); // Incluye los archivos al publicar
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-auto">
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del modal */}
        <section className="border-b-2 w-full pb-4">
          <div className="flex justify-between items-center">
            <button onClick={onClose}>Cancelar</button>
            <h2 className="text-sm font-bold text-center flex-1">Nuevo hilo</h2>
          </div>
        </section>

        {/* Hilos */}
        {threads.map((thread, index) => (
          <section key={thread.id} className="flex-1">
            {thread.active && (
              <textarea
                className="w-full border-l-2 pl-3 outline-none focus:ring-0"
                placeholder={thread.placeholder}
                value={thread.content}
                onInput={(e) => handleInput(index, e)}
                rows="1"
                style={{ overflow: "hidden", resize: "none" }}
              />
            )}
            {(index === 0 || thread.showButtons) && (
              <ModalBotones onFileSelect={handleFileSelect} />
            )}
          </section>
        ))}

        {/* Archivos seleccionados */}
        {selectedFiles.length > 0 && (
          <section className="mt-4">
            <h3 className="font-bold mb-2">Archivos seleccionados:</h3>
            <ul>
              {Array.from(selectedFiles).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Botón publicar */}
        <section className="flex justify-end items-center pt-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              isPublishEnabled
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-300 text-gray-500"
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
