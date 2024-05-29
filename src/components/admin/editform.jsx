import React, { useState, useEffect } from 'react';
import Person from '../../assets/person.svg';
import Email from '../../assets/email.svg';
import Lock from '../../assets/lock.svg';
import Role from '../../assets/manage.svg';
import Eye from '../../assets/eye.svg';
import EyeOff from '../../assets/eye-off.svg';
import CameraIcon from '../../assets/camera.svg';

const EditAdminForm = ({ admin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (admin) {
      setFullName(admin.name);
      setEmail(admin.email);
      setRole(admin.status);
    }
  }, [admin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Admin Data:', { fullName, email, oldPassword, newPassword, role, avatar });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  return (
    <div className="px-9 py-5 bg-white rounded-[11px] flex flex-col justify-start items-start">
      <div className="p-2.5 flex justify-center items-center gap-2.5">
        <div className="text-neutral-700 text-2xl font-bold leading-[38.40px]">{admin ? 'Edit Admin' : 'Add New Admin'}</div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center gap-[47px]">
        <div className="flex justify-start items-center gap-[90px]">
          <div className="flex justify-start items-start gap-2.5">
            <div className="relative w-[149px] h-[149px] rounded-xl overflow-hidden bg-neutral-200 flex items-center justify-center">
              {avatar ? (
                <img className="w-full h-full object-cover" src={avatar} alt="Admin Avatar" />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img className="w-10 h-10" src={CameraIcon} alt="Camera Icon" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
              <button
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="absolute bottom-0 right-0 m-2 w-10 h-[38px] p-2.5 bg-sky-900 rounded-[30px] flex-col justify-start items-start gap-2.5 inline-flex"
              >
                <img src={CameraIcon} alt="Camera Icon" className="w-20 h-18 cursor-pointer flex items-center" />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start gap-3.5">
            <div className="flex flex-col justify-start items-start gap-1">
              <label className="text-neutral-700 text-[15px] font-normal leading-normal">Full Name</label>
              <div className="relative">
                <img src={Person} alt="Person Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 w-[306px] px-2 py-2.5 rounded-[7px] border border-neutral-400 text-neutral-500 text-base font-normal leading-relaxed" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-1">
              <label className="text-neutral-700 text-[15px] font-normal leading-normal">Email</label>
              <div className="relative">
                <img src={Email} alt="Email Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 w-[306px] px-2 py-2.5 rounded-[7px] border border-neutral-400 text-neutral-500 text-base font-normal leading-relaxed" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-[5px]">
              <label className="text-neutral-700 text-[15px] font-normal leading-normal">Enter Old Password</label>
              <div className="relative">
                <img src={Lock} alt="Password Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="pl-10 w-[306px] px-2 py-2.5 rounded-[7px] border border-neutral-400 text-neutral-500 text-base font-normal leading-relaxed"
                />
                <button type="button" onClick={toggleOldPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src={showOldPassword ? EyeOff : Eye} alt="Toggle Password Visibility" />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-[5px]">
              <label className="text-neutral-700 text-[15px] font-normal leading-normal">Enter New Password</label>
              <div className="relative">
                <img src={Lock} alt="Password Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 w-[306px] px-2 py-2.5 rounded-[7px] border border-neutral-400 text-neutral-500 text-base font-normal leading-relaxed"
                />
                <button type="button" onClick={toggleNewPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <img src={showNewPassword ? EyeOff : Eye} alt="Toggle Password Visibility" />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-[5px]">
              <label className="text-neutral-700 text-[15px] font-normal leading-normal">Role</label>
              <div className="relative">
                <img src={Role} alt="Role Icon" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select value={role} onChange={(e) => setRole(e.target.value)} className="pl-10 w-[306px] px-2 py-2.5 rounded-[7px] border border-neutral-400 text-neutral-500 text-base font-normal leading-relaxed">
                  <option value="Super Admin">Super Admin</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-start gap-[9px]">
          <button type="submit" className="w-[306px] h-[38px] px-2 py-1.5 bg-sky-900 rounded-[7px] justify-center items-center gap-[98px] inline-flex">
            <div className="text-white text-base font-normal leading-relaxed">{admin ? 'Save Data' : 'Update Data'}</div>
          </button>
          <button type="button" className="w-[306px] h-[38px] px-2 py-1.5 bg-neutral-300 rounded-[7px] justify-center items-center gap-[98px] inline-flex">
            <div className="text-white text-base font-normal leading-relaxed">Cancel</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAdminForm;
