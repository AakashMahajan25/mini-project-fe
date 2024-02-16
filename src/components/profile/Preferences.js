import React, { useEffect, useMemo, useState } from 'react'
import './Preferences.scss'
import SelectMarket from '../../assets/images/selectMarket_img.png'
import Frruit from '../../assets/images/frruit-logo.png'
import SearchIcon from '../../assets/images/search-icon.png';
import LoginImg2 from '../../assets/images/login-side-img.png'
import FrruitLogo from '../../assets/images/frruit-logo.png'
import { Nav, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTopics, getAllTopics, searchTopics } from '../../screens/signup/slice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Preferences() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState('');
    const [selected, setSelected] = useState([]);
    const [topicsList, setTopicsList] = useState([]);

    const { topics, isLoading } = useSelector(state => state.signupSlice);

    const differentElements = useMemo(() => selected.filter(itemA => !topicsList.some(itemB => Number(itemA.topic_id) === Number(itemB.topic_id))), [selected, topicsList]);

    useEffect(() => {
        dispatch(getAllTopics())
    }, [])

    useEffect(() => {
        if (topics?.length > 0) {
            if (searchParam?.length > 0) {
                setTopicsList(topics)
            } else {
                const allTopics = topics.flatMap(category => category?.topics);
                setTopicsList(allTopics)
            }
        } else {
            setTopicsList([])
        }
    }, [topics])

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (searchParam)
                dispatch(searchTopics(searchParam));
            if (searchParam?.length === 0)
                dispatch(getAllTopics());
        }, 500);

        return () => {
            clearTimeout(debounceSearch);
        };
    }, [searchParam]);

    const onSeletTopic = (item) => {
        const array = selected;
        const index = array?.findIndex(el => el.topic_id === item.topic_id);

        if (index !== -1) {
            array.splice(index, 1);
        } else {
            array.push(item);
        }
        setSelected([...array])
    }

    const onSubmitTopics = async () => {
        if (selected.length < 10) {
            toast.error('Please select atleast 10 preferences')
            return;
        }
        const topics = await selected.map(el => Number(el?.topic_id))
        dispatch(addTopics({ topic_id: topics }))
            .unwrap()
            .then(async res => {
                navigate(`/market`);
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    return (
        <>
            <div className='select-preferences-profile-css'>
                <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                    <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" value={searchParam} onChange={(e) => setSearchParam(e?.target?.value)} placeholder='Search Preferences' />
                    <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                        <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                    </div>
                </div>
                <p className='mt-3 text-description' style={{ fontSize: 14, fontWeight: 600 }}>Add Preferences</p>
                <div >
                    <Nav variant="">
                        {
                            differentElements?.length > 0 &&
                            differentElements?.map((item, i) => (
                                <div onClick={() => onSeletTopic(item)}>
                                    <div className={selected.some(el => Number(el.topic_id) === Number(item?.topic_id)) ? 'selected' : 'unSelected'} >{item?.topic_name}</div>
                                </div>
                            )
                            )}
                    </Nav>
                    <Nav variant="">
                        {
                            topicsList?.length > 0 &&
                            topicsList?.map((item, i) => (
                                <div onClick={() => onSeletTopic(item)}>
                                    <div className={selected.some(el => Number(el.topic_id) === Number(item?.topic_id)) ? 'selected' : 'unSelected'} >{item?.topic_name}</div>
                                </div>
                            )
                            )}
                    </Nav>
                </div>
                <div className=''>
                    <button className='blue-btn mt-4 px-5' onClick={onSubmitTopics}>Done</button>
                </div>
            </div>
        </>
    )
}

export default Preferences