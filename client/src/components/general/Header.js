import { useState } from 'react'
import { IoChevronBackOutline } from 'react-icons/io5'
import { AiFillWechat, AiOutlineSearch } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { BiLock } from 'react-icons/bi'
import { MdLogout } from 'react-icons/md'
import ContactModal from './../modal/ContactModal'
import SearchPeopleModal from './../modal/SearchPeopleModal'
import EditProfileModal from './../modal/EditProfileModal'
import ChangePasswordModal from './../modal/ChangePasswordModal'
import Avatar from './Avatar'

const Header = ({ selectContact, setSelectContact }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [openContactListModal, setOpenContactListModal] = useState(false)
  const [openSearchPeopleModal, setOpenSearchPeopleModal] = useState(false)
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)

  return (
    <>
      <div className='flex items-center justify-between border-b-2 py-1 md:px-12 px-4 sticky top-0 z-[50]'>
        <div className='flex items-center'>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='Inspace' width='35' />
          <h1 className='md:block hidden font-logo text-lg ml-4'>Inspace</h1>
        </div>
        <div className='text-center'>
          <div className='flex items-center'>
            {selectContact && <IoChevronBackOutline className='md:hidden block translate-y-[2px] cursor-pointer' onClick={() => setSelectContact(false)} />}
            <h2 className='text-lg font-medium ml-2'>Lorem Ipsum</h2>
          </div>
          <p>Message</p>
        </div>
        <div className='flex items-center'>
          <p className='mr-5 md:block hidden'>Lorem Ipsum</p>
          <div className='relative'>
            <div className='cursor-pointer' onClick={() => setOpenDropdown(!openDropdown)}>
              <Avatar size='20px' />
            </div>
            <div className={`border-2 transition-transform absolute origin-top translate-y-[10px] top-full right-0 w-[190px] bg-white drop-shadow-xl rounded-md ${openDropdown ? 'scale-y-100' : 'scale-y-0'}`}>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2 rounded-tl-md rounded-tr-md' onClick={() => setOpenSearchPeopleModal(true)}>
                <AiOutlineSearch className='mr-2 translate-y-[1px]' />
                <p>Search People</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenContactListModal(true)}>
                <AiFillWechat className='mr-2 translate-y-[1px]' />
                <p>Start Chatting</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenEditProfileModal(true)}>
                <FaEdit className='mr-2 text-lg' />
                <p>Edit Profile</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b-2' onClick={() => setOpenChangePasswordModal(true)}>
                <BiLock className='mr-2 text-lg translate-y-[1px]' />
                <p>Change Password</p>
              </div>
              <div className='flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-bl-md rounded-br-md'>
                <MdLogout className='mr-2 translate-y-[2px] text-xl' />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal openContactListModal={openContactListModal} setOpenContactListModal={setOpenContactListModal} />
      <SearchPeopleModal openSearchPeopleModal={openSearchPeopleModal} setOpenSearchPeopleModal={setOpenSearchPeopleModal} />
      <EditProfileModal openEditProfileModal={openEditProfileModal} setOpenEditProfileModal={setOpenEditProfileModal} />
      <ChangePasswordModal openChangePasswordModal={openChangePasswordModal} setOpenChangePasswordModal={setOpenChangePasswordModal} />
    </>
  )
}

export default Header