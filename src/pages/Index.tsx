import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [showModal, setShowModal] = useState(true);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const handleContinue = () => {
    setShowModal(false);
    setAudioPlayed(true);
    
    const audio = new Audio('https://www.soundjay.com/human/sounds/cough-1.mp3');
    audio.play();
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
