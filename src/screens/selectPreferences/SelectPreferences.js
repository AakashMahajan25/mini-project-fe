import React, { useEffect, useState } from 'react'
import '../selectPreferences/SelectPreferences.scss'
import SelectMarket from '../../assets/images/selectMarket_img.png'
import SearchIcon from '../../assets/images/search-icon.png';
import { Nav, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTopics, searchTopics } from '../signup/slice';

function SelectPreferences() {
    const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useState('');
    const [selected, setSelected] = useState([]);
    const [topicsList, setTopicsList] = useState([]);

    const { topics, isLoading } = useSelector(state => state.signupSlice);

    console.log('topics:::::::::::', topicsList)

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

    return (
        <div className='select-preferences-css'>
            <div className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 100 }}>
                <div className='col-xl-7'>
                    <div className='select-preferences'>
                        <div>
                            <p className='heading'>We would like to know you!</p>
                            <p className='mt-4 text-description'>To ensure the optimization and tailored experience,
                                we kindly request your preferences.</p>
                        </div>
                        <div className="position-relative mt-3" style={{ marginBottom: 20 }}>
                            <input type="text" style={{ backgroundColor: 'white' }} className="form-control form-control-search" value={searchParam} onChange={(e) => setSearchParam(e?.target?.value)} placeholder='Search Preferences' />
                            <div className="position-absolute" style={{ left: 15, top: '15%' }}>
                                <img src={SearchIcon} style={{ width: 20, objectFit: 'contain', cursor: 'pointer' }} alt="Search Icon" />
                            </div>
                        </div>
                        <p className='mt-3 text-description' style={{ fontSize: 14, fontWeight: 600 }}>Add Preferences</p>
                        <div >
                            <Tab.Container defaultActiveKey="">
                                <Nav variant="pills">
                                    {
                                        topicsList?.length > 0 &&
                                        topicsList?.map((item, i) => (
                                            <Nav.Item onClick={() => onSeletTopic(item)}>
                                                <Nav.Link className='unSelected' eventKey="Block chain">{item?.topic_name}</Nav.Link>
                                            </Nav.Item>
                                        )
                                    )}
                                </Nav>
                            </Tab.Container>
                        </div>
                        <div className=''>
                            <button className='blue-btn mt-4 px-5'>Done</button>
                        </div>
                    </div>
                </div>
                <div className='col-xl-5'>
                    <div className='d-flex justify-content-center align-items-center imagecontainer'>
                        <img src={SelectMarket} style={{ objectFit: 'contain', width: '100%', height: window.innerHeight / 2.0 }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectPreferences