   {/* Mostrar los archivos publicados */}
                {post.files && Array.from(post.files).map((file, fileIndex) => (
                  <div key={fileIndex}>
                    {file.type.startsWith('image/') && <img src={URL.createObjectURL(file)} alt="uploaded" />}
                    {file.type.startsWith('video/') && <video src={URL.createObjectURL(file)} controls />}
                  </div>
                ))}