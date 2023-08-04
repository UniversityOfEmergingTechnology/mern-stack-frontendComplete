import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'


import {updateProfile} from '../../../services/operations/SettingsApi'
import IconBtn from '../../common/IconBtn'



const genders = ["Male" , "Female" , "Non-Binary", "Prefer not to say", "Other"]
const EditProfile = () => {
  const {user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {register , handleSubmit , formState : {errors}} = useForm()

  const submitProfileForm = async(data) => {
    console.log("Form Data - " , data)
      try{
        dispatch(updateProfile(token , data , user))
      }
      catch(error){
        console.log("Error message - " , error.message)
      }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 py-8 px-12'>
        <h2 className='text-lg text-[#140432] text-[25px] font-walsheimCon font-semibold'>Profile Information</h2>

        <div className='flex flex-col gap-5 lg:flex-row'>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="firstName" className='lable-style'>
              First Name
            </label>
            <input 
              type="text" 
              name='firstName'
              id='firstName'
              className='form-style2'
              {...register("firstName" , { required:true })}
              defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className='mt-1 text-[12px] text-yellow-500'>Please enter your first name</span>
              )}
          </div>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="lastName" className='lable-style'>
              Last Name
            </label>
            <input 
              type="text" 
              name='lasttName'
              id='lastName'
              className='form-style2'
              {...register("lastName" , { required:true })}
              defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className='mt-1 text-[12px] text-yellow-500'>Please enter your last name</span>
              )}
          </div>
        </div>


        <div className='flex flex-col gap-5 lg:flex-row'>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="dateOfBirth" className='lable-style'>
              Date of Birth
            </label>
            <input 
              type="date" 
              name='dateOfBirth'
              id='dateOfBirth'
              className='form-style2'
              {...register("dateOfBirth" , { required : {
                value : true ,
                message : "Please enter your Date of Birth"
              },
              max : {
                value : new Date().toISOString().split("T")[0],
                message : "Date of Birth cannot be in the future"
              }
               })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className='mt-1 text-[12px] text-yellow-500'>{errors.dateOfBirth.message}</span>
              )}
          </div>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="gender" className='lable-style'>
              Gender
            </label>
            <select 
              type="text" 
              name='gender'
              id='gender'
              className='form-style2'
              {...register("gender" , { required:true })}
              defaultValue={user?.additionalDetails?.gender}
              >
              {
                genders.map((ele , i) => {
                  return(
                    <option key={i} value={ele}>{ele}</option>
                  )
                })
              }
              </select>
              {errors.gender && (
                <span className='mt-1 text-[12px] text-yellow-500'>Please select your gender</span>
              )}
          </div>
        </div>


        <div className='flex flex-col gap-5 lg:flex-row'>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="contactNumber" className='lable-style'>
              Contact Number
            </label>
            <input 
              type="text" 
              name='contactNumber'
              id='contactNumber'
              placeholder='Enter your contact number'
              className='form-style2'
              {...register("contactNumber" , { required : {
                  value : true,
                  message : "Please enter your contact number"
                },
                maxLength : {
                  value : 12 ,
                  message: "Invalid contact number"
                } ,
                minLength : {
                  value : 10,
                  message: "Invalid contact number"
                }
                })}
              defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className='mt-1 text-[12px] text-yellow-500'>{errors.contactNumber.message}</span>
              )}
          </div>
          <div className='flex flex-col gap-2 lg:w-[40%]'>
            <label htmlFor="about" className='lable-style'>
              About
            </label>
            <input 
              type="text" 
              name='about'
              id='about'
              placeholder='Enter bio details'
              className='form-style2'
              {...register("about" , { required:true })}
              defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className='mt-1 text-[12px] text-yellow-500'>Please enter your About</span>
              )}
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <button onClick={() => {
          navigate('/dashboard/my-profile')
        }}
        className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
        > Cancel</button>
        <IconBtn type="Submit" text="Save"/>
      </div>
    </form>
  )
}

export default EditProfile