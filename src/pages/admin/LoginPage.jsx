import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useFetch'; // Adjust the import path as needed
import Rectangle1 from '../../assets/rectangle1.svg';
import Rectangle2 from '../../assets/rectangle2.svg';
import Rectangle3 from '../../assets/rectangle3.svg';
import Rectangle4 from '../../assets/rectangle4.svg';
import Eye from '../../assets/eye.svg';
import EyeOff from '../../assets/eye-off.svg';
import Logo from '../../assets/image/logo-recything 2.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError, isLoading } = useLogin();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    mutateAsync({ endpoint: '/admin/login', loginData: { email, password } }).then((res) => {
      console.log(res.data.token);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-900 relative overflow-hidden">
      <img src={Rectangle1} alt="Rectangle1" className="absolute w-[569.80px] h-[569.80px] left-[-650px] top-[99.91px] origin-top-left transform rotate-[-45deg] opacity-20 bg-gradient-to-b from-[#FFFFFF00] to-[#FFFFFF66] rounded-[50px]" />
      <img src={Rectangle2} alt="Rectangle2" className="absolute w-[569.80px] h-[569.80px] left-[-550px] top-[99.91px] origin-top-left transform rotate-[-45deg] opacity-15 bg-gradient-to-b from-[#FFFFFF00] via-blue-300 rounded-[50px]" />
      <img
        src={Rectangle3}
        alt="Rectangle3"
        className="absolute w-[569.80px] h-[569.80px] right-[-650px] bottom-[10px] origin-bottom-right transform rotate-[-45deg] opacity-15 bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF] rounded-[50px]"
      />
      <img
        src={Rectangle4}
        alt="Rectangle4"
        className="absolute w-[569.80px] h-[569.80px] right-[-550px] bottom-[30px] origin-bottom-right transform rotate-[-45deg] opacity-15 bg-gradient-to-b from-[#FFFFFF4D] to-[#FFFFFF] rounded-[50px]"
      />

      <div className="w-[440px] px-[50px] py-[50px] bg-white rounded-[25px] flex-col gap-[95px] inline-flex">
        <img className="w-52 mx-auto mb-2" src={Logo} alt="Placeholder" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <input type="email" placeholder="Email Address" value={email} onChange={handleEmailChange} className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex flex-col relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="py-3 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <img src={showPassword ? EyeOff : Eye} alt="Toggle Password Visibility" />
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="py-3 bg-sky-900 text-white font-bold rounded hover:bg-sky-800 transition duration-300">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
