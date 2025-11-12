
import React, { useState, useEffect } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isHuman, setIsHuman] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value) return 'Имя обязательно для заполнения.';
        if (value.length < 2) return 'Имя должно содержать не менее 2 символов.';
        return null;
      case 'email':
        if (!value) return 'Email обязателен для заполнения.';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Неверный формат email адреса.';
        return null;
      case 'message':
        if (!value) return 'Сообщение обязательно для заполнения.';
        if (value.length < 10) return 'Сообщение должно содержать не менее 10 символов.';
        return null;
      default:
        return null;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Perform a full validation on submit
    const newErrors = Object.keys(formData).reduce((acc, key) => {
        const error = validateField(key, formData[key as keyof typeof formData]);
        if(error) acc[key] = error;
        return acc;
    }, {} as { [key: string]: string });

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(newErrors).length > 0 || !isHuman) {
      if(!isHuman) {
        setErrors(prev => ({...prev, human: 'Пожалуйста, подтвердите, что вы не робот.'}))
      }
      return;
    }

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      if (Math.random() > 0.1) { 
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setIsHuman(false);
      } else {
        setStatus('error');
      }
    }, 1500);
  };
  
  const getInputClass = (name: string) => {
    const baseClass = "w-full bg-base-800 border text-neutral-50 placeholder-neutral-500 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all";
    if (!touched[name]) return `${baseClass} border-neutral-50/20 focus:ring-accent`;
    return errors[name] 
      ? `${baseClass} border-red-500 focus:ring-red-500`
      : `${baseClass} border-green-500 focus:ring-green-500`;
  }

  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-50">Связаться и Сотрудничать</h2>
          <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">Есть идея или проект? Давайте создадим что-то вместе.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="name" className="sr-only">Имя</label>
              <input
                type="text" id="name" name="name" placeholder="Ваше имя" required
                value={formData.name} onChange={handleChange} onBlur={handleBlur}
                className={getInputClass('name')}
              />
              {touched.name && errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email" id="email" name="email" placeholder="Ваш email" required
                value={formData.email} onChange={handleChange} onBlur={handleBlur}
                className={getInputClass('email')}
              />
              {touched.email && errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Сообщение</label>
              <textarea
                id="message" name="message" rows={5} placeholder="Ваше сообщение" required
                value={formData.message} onChange={handleChange} onBlur={handleBlur}
                className={getInputClass('message')}
              ></textarea>
              {touched.message && errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
            </div>

            <div className="flex items-center">
                <input 
                    type="checkbox" 
                    id="human-check" 
                    checked={isHuman}
                    onChange={(e) => {
                      setIsHuman(e.target.checked)
                      if (e.target.checked) {
                        setErrors(prev => ({...prev, human: null}));
                      }
                    }}
                    className="h-5 w-5 rounded bg-base-800 border-neutral-50/20 text-accent focus:ring-accent"
                />
                <label htmlFor="human-check" className="ml-3 text-neutral-300">Я не робот</label>
            </div>
            {errors.human && <p className="text-red-500 text-sm">{errors.human}</p>}


            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-base-900 font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-900 focus:ring-accent disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center w-full sm:w-auto mx-auto"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-base-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </>
                ) : (
                  'Отправить Сообщение'
                )}
              </button>
            </div>
          </form>

          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 text-green-300 rounded-lg text-center">
              Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.
            </div>
          )}
          {status === 'error' && (
             <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg text-center">
              Произошла ошибка. Пожалуйста, попробуйте еще раз позже.
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Contact;
