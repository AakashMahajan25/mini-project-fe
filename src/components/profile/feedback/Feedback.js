import React, { useState, useRef } from 'react';
import './Feedback.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUploadURL, updateUploadURL } from '../../../screens/marketContentGPT/slice';
import { userFeedback } from '../../../screens/profile/usersSlice';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import FeedbackImg from '../../../assets/images/feedback-img.png';
import MailImg from '../../../assets/images/blue-mail-img.png';
import PhoneImg from '../../../assets/images/blue-phone-img.png';
import JpgFile from '../../../assets/images/jpg-file.png';
import DeleteIcon from '../../../assets/images/delete-icon.png';
import Loader from '../../loader/Loader';

function Feedback() {
    const dispatch = useDispatch();
    const { isLoading: isUserSliceLoading } = useSelector(state => state.userSlice);
    const { isLoading: isContentSliceLoading } = useSelector(state => state.contentGPTSlice);
    const isLoading = isUserSliceLoading || isContentSliceLoading;

    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const feedbackSchema = yup.object().shape({
        title: yup.string().required("Title is required"),
        notes: yup.string().required("Note is required"),
        attachment: yup.array().min(1, "At least one image is required")
    });

    const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(feedbackSchema)
    });

    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setValue("attachment", selectedFiles.filter((_, i) => i !== index));
    };

    const addTimestampToFileName = (fileName) => {
        const timestamp = Date.now();
        const parts = fileName.split('.');
        const extension = parts.pop();
        const newName = `${parts.join('.')}_${timestamp}.${extension}`;
        return newName;
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = files.map(file => {
            const modifiedName = addTimestampToFileName(file.name);
            return new File([file], modifiedName, { type: file.type });
        });
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
        setValue("attachment", [...selectedFiles, ...newFiles]);
    };

    const onSubmit = async (data) => {
        try {
            if (selectedFiles.length > 0) {
                const attachmentUrls = [];

                for (const file of selectedFiles) {
                    await dispatch(getUploadURL(file)).unwrap()
                        .then(async (res) => {
                            const fileData = { url: res.data, file };
                            await dispatch(updateUploadURL(fileData)).unwrap();
                            attachmentUrls.push(file.name);
                        })
                        .catch((error) => {
                            console.error('Error getting upload URL:', error);
                        });
                }

                const requestData = {
                    title: data.title,
                    notes: data.notes,
                    attachment: attachmentUrls
                };

                await dispatch(userFeedback(requestData)).unwrap().then(async (res) => {
                    reset({
                        title: '',
                        notes: '',
                        attachment: []
                    });
                    setSelectedFiles([]);
                    toast.success("Feedback sent");
                });
            } else {
                toast.error("Please select a file");
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error(error?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <div className='feedback-css'>
                <div className='row'>
                    <div className='col-lg-7 col-sm-12'>
                        <div className='white-background '>
                            <div className='top-text mb-3'>Provide Feedback</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mt-2">
                                    <label className='form-control-label'>Subject</label>
                                    <div className='w-100 mb-3'>
                                        <Controller
                                            control={control}
                                            name="title"
                                            render={({ field }) => (
                                                <input
                                                    type="text"
                                                    className={errors?.title ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                    placeholder='Subject'
                                                    style={{ color: 'black', textIndent: 0 }}
                                                    {...field}
                                                />
                                            )}
                                        />
                                        {errors?.title && <p className='errorText'>{errors?.title?.message}</p>}
                                    </div>

                                    <label className='form-control-label'>Tell us what we can improve</label>
                                    <div className='w-100 mb-3'>
                                        <Controller
                                            control={control}
                                            name="notes"
                                            render={({ field }) => (
                                                <textarea
                                                    type="text"
                                                    className={errors?.notes ? "form-control form-control-input error-feild" : "form-control form-control-input"}
                                                    placeholder='Describe the problem in detail…'
                                                    style={{ color: 'black', textIndent: 0 }}
                                                    {...field}
                                                    rows={4}
                                                />
                                            )}
                                        />
                                        {errors?.notes && <p className='errorText'>{errors?.notes?.message}</p>}
                                    </div>

                                    <label className='form-control-label'>Attachment</label>
                                    <div className='upload-box'>
                                        <div>
                                            <div className='drag-files'>Drop your files or click to upload</div>
                                            <div className='grey-text'>supported file types: jpg, png</div>
                                            <div className='d-flex justify-content-center'>
                                                <p className='browse-btn' onClick={handleBrowseClick}>
                                                    <div className='browse-text'>Browse</div>
                                                </p>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileChange}
                                                    accept=".jpg,.png"
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* {errors?.attachment && <p className='errorText'>{errors?.attachment?.message}</p>} */}

                                    {selectedFiles.map((file, index) => (
                                        <div className='d-flex justify-content-between mt-3' key={index}>
                                            <div className='d-flex align-items-center'>
                                                <img src={JpgFile} className='jpg-icon' />
                                                <div className='ms-2'>
                                                    <div className='image-name'>{file.name}</div>
                                                    <div className='date-text'>{new Date(file.lastModified).toLocaleDateString()} - {Math.round(file.size / 1024)} kB</div>
                                                </div>
                                            </div>
                                            <img
                                                src={DeleteIcon}
                                                style={{ width: 24, height: 24, cursor: 'pointer' }}
                                                onClick={() => handleRemoveImage(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <button className='blue-btn mt-3' style={{ width: 180 }} type='submit'>
                                        {isLoading ? (
                                            <div style={{ height: 20, width: 20 }} className="spinner-border text-light" role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        ) : (
                                            "Submit Feedback"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-5 col-sm-12 margin-class'>
                        <div className='right-side'>
                            <div className='d-flex align-items-center justify-content-end'>
                                <div className='feedback-text mb-4'>Feedback</div>
                            </div>
                            <div className='d-flex align-items-center justify-content-center'>
                                <img src={FeedbackImg} className='feedback-icon' />
                            </div>
                            <div>
                                <div className='d-flex align-items-center'>
                                    <img src={PhoneImg} className='small-icon' />
                                    <div className='black-text'>+91 8369894335</div>
                                </div> 
                                <div className='d-flex align-items-center mt-2'>
                                    <img src={MailImg} className='small-icon' />
                                    <div className='black-text'>support@airrchip.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
