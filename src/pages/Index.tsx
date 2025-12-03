import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [showModal, setShowModal] = useState(true);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [customAudioUrl, setCustomAudioUrl] = useState('https://cdn.freesound.org/previews/442/442867_3797507-lq.mp3');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(customAudioUrl);
    audioRef.current.volume = 1.0;
    audioRef.current.load();
    
    const tryAutoplay = async () => {
      try {
        await audioRef.current?.play();
        setShowModal(false);
        setAudioPlayed(true);
      } catch (err) {
        console.log('Autoplay blocked, waiting for user interaction');
      }
    };
    
    const timer = setTimeout(tryAutoplay, 100);
    
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [customAudioUrl]);

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Audio playback failed:', err);
      });
    }
    
    setShowModal(false);
    setAudioPlayed(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setIsEditing(false);
    }
  };

  const handleResetPrank = () => {
    setShowModal(true);
    setAudioPlayed(false);
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setCustomAudioUrl(urlInput.trim());
      setUrlInput('');
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => {}}
          />
          
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-scale-in">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-gray-900">
                Если хотите посетить наш сайт, напишите продолжить
              </h2>
              
              <Button 
                onClick={handleContinue}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg font-medium rounded-xl transition-all duration-200 hover:scale-105"
              >
                Продолжить
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              О пранке
            </h1>
            <div className="w-24 h-1 bg-black mx-auto rounded-full" />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8 animate-fade-in">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Информация о создателе
              </h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  Этот пранк был создан с целью развлечения и создания неожиданных ситуаций. 
                  Идея заключается в том, чтобы удивить посетителя сайта неожиданным аудио после 
                  нажатия на кнопку "Продолжить".
                </p>
                
                <p className="text-lg">
                  Автор пранка — творческий разработчик, который любит создавать забавные 
                  и необычные веб-проекты. Этот сайт создан исключительно в развлекательных 
                  целях и не несет никакого вреда.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Как это работает?
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✨ При входе на сайт появляется модальное окно</li>
                    <li>🎭 Затемненный фон привлекает внимание</li>
                    <li>🔊 После нажатия кнопки запускается аудио-сюрприз</li>
                    <li>😄 Реакция — бесценна!</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Настройки пранка
                  </h3>
                  
                  <div className="space-y-4">
                    {!isEditing ? (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            setIsEditing(true);
                            setUploadMode('file');
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          <Icon name="Upload" className="mr-2" size={18} />
                          Загрузить файл
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(true);
                            setUploadMode('url');
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          <Icon name="Link" className="mr-2" size={18} />
                          Ссылка
                        </Button>
                        <Button
                          onClick={handleResetPrank}
                          variant="outline"
                        >
                          <Icon name="RotateCcw" className="mr-2" size={18} />
                          Тест
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {uploadMode === 'file' ? (
                          <div className="space-y-2">
                            <label className="text-sm text-gray-600 font-medium block">
                              Выберите аудиофайл
                            </label>
                            <Input
                              ref={fileInputRef}
                              type="file"
                              accept="audio/*"
                              onChange={handleFileUpload}
                              className="cursor-pointer"
                            />
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <label className="text-sm text-gray-600 font-medium block">
                              Вставьте ссылку на аудио
                            </label>
                            <div className="flex gap-2">
                              <Input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="https://example.com/audio.mp3"
                                className="flex-1"
                              />
                              <Button
                                onClick={handleUrlSubmit}
                                disabled={!urlInput.trim()}
                              >
                                <Icon name="Check" size={18} />
                              </Button>
                            </div>
                          </div>
                        )}
                        <Button
                          onClick={() => {
                            setIsEditing(false);
                            setUrlInput('');
                          }}
                          variant="ghost"
                          className="w-full"
                        >
                          Отмена
                        </Button>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-500">
                      {customAudioUrl.includes('blob:') 
                        ? '✓ Загружен пользовательский файл' 
                        : customAudioUrl.includes('freesound.org')
                        ? '🔊 Используется звук по умолчанию'
                        : '✓ Используется пользовательская ссылка'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 text-gray-600 animate-fade-in">
            <p className="text-sm">
              Создано с юмором и любовью к веб-разработке
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;