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
import { getUserTopics, updateUserTopics } from '../../screens/profile/usersSlice';
import ReactGA from 'react-ga4';

function Preferences() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState('');
    const [selected, setSelected] = useState([]);
    const [topicsList, setTopicsList] = useState([]);

    const { topics, isLoading } = useSelector(state => state.signupSlice);
    const { userTopics } = useSelector(state => state?.userSlice)

    useEffect(() => {
        dispatch(getUserTopics());
        dispatch(getAllTopics())
    }, [])

    useEffect(() => {
        if (userTopics?.length > 0) {
            const data = userTopics.map(el => ({
                topic_id: el.topic_id,
                topic_name: el?.topic_name
            }))
            setSelected([...data])
        }

    }, [userTopics])

    useEffect(() => {
        if (topics?.length > 0) {
            if (searchParam?.length > 0) {
                const filterTopics = topics.filter(el => !selected.some(el2 => Number(el.topic_id) === Number(el2.topic_id)))
                setTopicsList(filterTopics)
            } else {
                const allTopics = topics.flatMap(category => category?.topics);
                const filterTopics = allTopics.filter(el => !selected.some(el2 => Number(el.topic_id) === Number(el2.topic_id)))
                setTopicsList(filterTopics)
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

    const otherSelectedTopics = useMemo(() => selected.filter(itemA =>
        !topicsList.some(itemB => Number(itemA.topic_id) === Number(itemB.topic_id)) && !userTopics.some(itemB => Number(itemA.topic_id) === Number(itemB.topic_id))
    ), [selected, topicsList]);

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

    const onUpdateTopics = async () => {
        ReactGA.event({
            category: 'Profiling',
            action: 'user_select_preference',
            label: 'User Select Preferences'
          });
        if (selected.length < 10) {
            toast.error("Please select atleast 10 preferences")
            return;
        }
        const topics = await selected.map(el => Number(el?.topic_id))
        dispatch(updateUserTopics({ topic_id: topics }))
            .unwrap()
            .then(async res => {
                toast.success("Preferences updated successfully")
                dispatch(getUserTopics());
                setSearchParam('')
            })
            .catch(error => {
                toast.error("Error in updating preferences")
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
                <p className='mt-3 text-description' style={{ fontSize: 14, fontWeight: 600 }}>Added Preferences</p>
                <div >
                    <Nav variant="">
                        {
                            userTopics?.length > 0 &&
                            userTopics?.map((item, i) => (
                                <div onClick={() => onSeletTopic(item)}>
                                    <div className={selected.some(el => Number(el.topic_id) === Number(item?.topic_id)) ? 'selected' : 'unSelected'} >{item?.topic_name}</div>
                                </div>
                            )
                        )}
                    </Nav>
                </div>
                <p className='mt-3 text-description' style={{ fontSize: 14, fontWeight: 600 }}>Add Preferences</p>
                <div >
                    <Nav variant="">
                        {
                            otherSelectedTopics?.length > 0 &&
                            otherSelectedTopics?.map((item, i) => (
                                <div onClick={() => onSeletTopic(item)}>
                                    <div className={selected.some(el => Number(el.topic_id) === Number(item?.topic_id)) ? 'selected' : 'unSelected'} >{item?.topic_name}</div>
                                </div>
                            ))
                        }
                    </Nav>
                    <Nav variant="">
                        {
                            topicsList?.length > 0 &&
                            topicsList?.map((item, i) => (
                                <div onClick={() => onSeletTopic(item)}>
                                    <div className={selected.some(el => Number(el.topic_id) === Number(item?.topic_id)) ? 'selected' : 'unSelected'} >{item?.topic_name}</div>
                                </div>
                            ))
                        }
                    </Nav>
                </div>
                <div className=''>
                    <button className='blue-btn mt-4 px-5' onClick={onUpdateTopics}>Done</button>
                </div>
            </div>
        </>
    )
}

export default Preferences