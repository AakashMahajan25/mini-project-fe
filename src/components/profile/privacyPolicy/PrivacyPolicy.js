import React from 'react';
import '../privacyPolicy/PrivacyPolicy.scss';

function PrivacyPolicy() {
    return (
        <div className='privacypolicy-css'>
            <h3 className='main-heading'>Frruit Privacy Policy</h3>
            {/* <p className='updated-date'>Last updated: June 4th, 2024.</p>
            <p className='text-subheading1'>
                Please read this Privacy Notice carefully.  By using any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Notice.  If you do not agree to this Privacy Notice, please do not use or access the Services.
            </p> */}

            <h2 className='text-heading'>1.INTRODUCTION </h2>
            <p className='text-subheading2'>
                1.1. At Airrchip Communications Private Limited <b>(“we”, “Company”)</b>, we respect your privacy and data protection rights and recognize the importance of protecting the personal data we collect and process. This Privacy Policy is designed to help you to understand what personal data we collect about you and how we use and share it.
            </p>

            <p className='text-subheading2'>
                1.2. This Privacy Policy should be read in conjunction with the Terms of Use (“Terms”) made available on the Website. Personal Information of a User(s) is collected if the User(s) registers himself/herself on the Website, accesses the Website or takes any action on the Website. The terms ‘Personal Information’, ‘Sensitive Personal Data’ and ‘Information’ shall have the meaning ascribed to it under the applicable laws in India
            </p>

            <p className='text-subheading2'>
                1.3. The Company respects your privacy and values the trust you place in us by providing personal information as required, and this Privacy Policy sets out the policies and practices in relation to the collection, use, disclosure and protection of the personal information of the Users of the Website.
            </p>

            <p className='text-subheading2'>
                1.4. All capitalized terms and terms used in the Terms which are also used herein below shall be ascribed the same meaning as set out in the Terms, unless repugnant to the context herein or otherwise have been specifically defined herein.
            </p>

            {/* <p className='text-subheading2'>
                1.5. Acceptance of this Policy does not constitute consent as a legal basis for processing your personal information under the EU or UK General Data Protection Regulation (GDPR). For further information regarding our GDPR obligations, please see the EU/UK GDPR Section below. (SHOULD WE ADD SEPARATE PROVISIONS FOR CCPA, GDPR etc)
            </p> */}

            <h2 className='text-heading'>2.PERSONAL DATA COLLECTED BY AIRRCHIP</h2>
            <p className='text-subheading3'>
                2.1.  The Company may collect several types of information about its Users. Some of this information may be given voluntarily by the User while availing Services offered on the Website and/ or [while registering oneself on the Website]; and while some information may be collected automatically when the User is surfing the Website.
            </p>
            <p className='text-subheading3'>
                2.2. We collect the categories of Personal Information identified for the following purposes:
            </p>

            <table class="table table-bordered custom-table">
                <thead class="table-header">
                    <tr class="header-css">
                        <th scope="col">Categories of Personal Information</th>
                        <th scope="col">Purposes for Collection</th>
                    </tr>
                </thead>
                <tbody className='text-subheading3'>
                    <tr>
                        <td scope="row">
                            <ul>
                                <li>
                                    Personal identifiers: name, email address, your billing address, telephone numbers, account name and password, IP address, mobile ad ID
                                </li>
                                <li>
                                    Protected class information: age, date of birth, gender
                                </li>
                                <li>
                                    Commercial and financial information: records of services purchased and payment information
                                </li>
                                <li>
                                    Internet or other electronic activity information: your device and browser type, and information regarding your interaction with our website.
                                </li>
                                <li>
                                    Inferences drawn from personal information we collect
                                </li>
                            </ul>
                        </td>
                        <td>
                            To provide our Services to you
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <ul>
                                <li>
                                    Personal identifiers: name, email address, account name, IP address, mobile ad ID
                                </li>
                                <li>
                                    Audio information: recordings of customer service calls
                                </li>
                            </ul>
                        </td>
                        <td>
                            To communicate with you about our Services and business and for customer support
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <ul>
                                <li>
                                    Personal identifiers: name, email address, telephone numbers
                                </li>
                                <li>
                                    Professional information: job title, information about your employer
                                </li>
                            </ul>
                        </td>
                        <td>
                            To engage in business transactions with the entity you represent and market to or engage in diligence with the entities you represent
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <ul>
                                <li>
                                    Personal identifiers: name, email address, Instagram and Facebook profile links; your billing address, telephone numbers, account name and password, IP address, mobile ad ID.
                                </li>
                                <li>
                                    Protected class information: age, date of birth, gender provided.
                                </li>
                                <li>
                                    Commercial and financial information: records of services purchased and payment information
                                </li>
                                <li>
                                    Internet or other electronic activity information: your device and browser type, your browsing and search history on our websites.
                                </li>
                            </ul>
                        </td>
                        <td>
                            To monitor or improve our Sites and for internal business analysis
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            <ul class="no-list-style">
                                <li>
                                    Personal identifiers: name, email address; your billing address, telephone numbers, account name and password, IP address, mobile ad ID
                                </li>
                                <li>
                                    Protected class information: age, gender provided
                                </li>
                                <li>
                                    Commercial and financial information: records of services purchased, played, and payment information
                                </li>
                                <li>
                                    Internet or other electronic activity information: your device and browser type, your browsing and search history on our website, and information regarding your interaction with our website.
                                </li>
                                <li>
                                    Inferences drawn from personal information we collect
                                </li>
                            </ul>
                        </td>
                        <td>
                            To prevent fraud, activities that violate our Terms of Use or that are illegal; and to protect our rights and the rights and safety of our users or others
                        </td>
                    </tr>
                </tbody>
            </table>
            <p className='text-subheading3'>2.3. <u>Information retrieved/collected automatically</u></p>
            <p className='text-subheading3'>
                The Company may collect a variety of technical, navigational and other non-personal information about you such as your types of browsers, usage patterns, geo-location of a browser, address of your server from where the Website is being accessed, [tabs and pages of the Website visited or URLs visited after use or access to the Website etc. when you visit the Website], through the following:
                <p className='text-subheading3'>
                    (a) Cookies: The Website may assign a ‘cookie’ to you, encrypting your information, which may be saved on your computer’s hard drive while you visit the Website. This will help adjust and track your preferential information every time you visit the Website thereafter. You may note that this Privacy Policy includes ‘cookies’ that are placed by the Website and does not cover any ‘cookie’ that may be placed by any third-party website/ app. The internet browser may allow you to not store any cookies on your computer; however you may note that, in such an event your navigation through the Website or access to certain features/ services of the Website may be restricted.
                </p>
                <p className='text-subheading3'>
                    (b) Beacons/Bugs: A beacon is a picture file used to keep track of your navigation through a single website or a series of websites. The Company may use such web beacons to study and analyze the usage of the Website.
                </p>
                <p className='text-subheading3'>
                    (c) Usage Details: The Website may also collect details regarding your visits to and navigation through the Website such as your location data, geo-locations other resources that you access etc.
                </p>
            </p>

            <div>
                <h2 className='text-heading'>3. Your Data Controller</h2>
                <p className='text-subheading3'>
                    Company is your Data Controller and responsible for your Personal Data. Any inquiries about your data should be sent to us by email to <span style={{color:'#4563E4'}}>support@airrchip.com</span>.
                </p>
            </div>

            <div>
                <h2 className='text-heading'>4. Our responsibility as Data Controller </h2>
                <p className='text-subheading3'>
                    In discharging our responsibilities as a Data Controller we have employees who will deal with your data on our behalf (known as <b>“Processors”</b>). The responsibilities below may be assigned to an individual or may be taken to apply to the organization as a whole. The Data Controller and our Processors have the following responsibilities:
                </p>
                <div>
                    <ul>
                        {/* <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Ensure that all processing of Personal Data is governed by one of the legal bases laid out in the GDPR (see 2.2 below for more information);
                            </p>
                        </li> */}

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Ensure that Processors authorized to process Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk associated with the processing of Personal Data;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Obtain the prior specific or general authorization of the Controller before engaging another Processor; Assist the Controller in the fulfilment of the Controller's obligation to respond to requests for exercising the data subject's rights;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in the GDPR and allow for and contribute to audits, including inspections, conducted by the Controller or another auditor mandated by the Controller;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Maintain a record of all categories of processing activities carried out on behalf of a Controller;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Cooperate, on request, with the supervisory authority in the performance of its tasks;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                Ensure that any person acting under the authority of the Processor who has access to Personal Data does not process Personal Data except on instructions from the Controller;
                            </p>
                        </li>

                        <li>
                            <p className='text-subheading3' style={{ marginTop: 16 }}>
                                and Notify the Controller without undue delay after becoming aware of a Personal Data Breach.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className='text-heading'>5. Consent given by User </h2>
                <p className='text-subheading4'>
                    You hereby expressly grant your consent to the Company through the Website to collect, possess, receive, upload, store, deal with, handle and/or use, share, disclose and transfer the Personal Information and/or Sensitive Personal Data or Information to such persons and for such lawful purposes as contained in this Privacy Policy. Further, you also hereby grant your consent to enable the Website and/or its independent service providers to collect non-personal data by placing cookies, etc. Once the personal information and/or sensitive personal data are collected, the Company shall have the right to use the same for the purposes for which the same were collected.
                </p>
            </div>

            <div>
                <h2 className='text-heading'>6. Disclosure of Personal Information </h2>
                <p className='text-subheading4'>
                    6.1. The Company may disclose/ transfer and/or exchange your personal information including your personal data to and/ or with all such persons and/or entities, as may be required for the aforesaid lawful purposes, including but not limited to:
                </p>
                <div className='subtext-content'>
                    <p className='text-subheading4'>
                        (a)	any of its directors, associates or employees, or any of its affiliates;
                    </p>
                    <p className='text-subheading4'>
                        (b)	any agent, contractor or third party service provider who provides administrative, advertising and marketing agencies, telecommunications, computer, financial intermediary or other services to the Company in connection with the Website or the operation of the Company’s business and Services through the Website;
                    </p>
                    <p className='text-subheading4'>
                        (c)	any other person under a duty of confidentiality, including any member which has undertaken to keep such information confidential;
                    </p>
                    <p className='text-subheading4'>
                        (d)	any actual or proposed assignee of the Company or participant or sub-participant or transferee of the Company’s rights in respect of the information of the User;
                    </p>
                    <p className='text-subheading4'>
                        (e)	to any third party when you choose to avail certain Services/ facilities offered on the Website. In such an event, the Company does not take any responsibility for any misuse or unwarranted disclosure of such information that may be made to such third party;
                    </p>
                    <p className='text-subheading4'>
                        (f)	any person to whom the Company is under an obligation to make disclosure under and for the purposes of any guidelines issued by regulatory or other authorities;
                    </p>
                    <p className='text-subheading4'>
                        (g)	as may be required by law or court order or administrative/ government agency or in a situation of national emergency or when the Company believes that an information disclosure is required to protect the Company’s rights or those of the Company’s/ Website’s Users or any other aspect of the Website and to comply with the legal process without any restrictions
                    </p>
                    <p className='text-subheading4'>
                        (h)	in any event where the Company has reason to believe that you are in violation of any applicable law, rule or regulation, or interfering with the rights of any other person;
                    </p>
                    <p className='text-subheading4'>
                        (i)	to any potential investor or purchaser of any interest in the Company or Website or any associated entity or in its business in connection with any potential re-organisation, merger or disposal; and

                    </p>
                    <p className='text-subheading4'>
                        (j)	any lawyer or other professionals for the preparation of any document or professional advice regarding the above.
                    </p>
                </div>
            </div>

            <p className='text-subheading4'>
                6.2 The Company will endeavour to ensure that the third party receiving any personal information does not disclose it further and shall observe the same level of data protection as is ensured by the Company in respect of the Website and in consonance with this Privacy Policy.
            </p>

            <p className='text-subheading4'>
                6.3 Notwithstanding anything contained elsewhere, any Personal Information including Sensitive Data may be disclosed by the Company to any third party by an order/ direction under the law for the time being in force, without any consent or other obligation. For instance, Personal Information may be released to an officer making the request if he provides a warrant or a court order requiring such disclosure.

            </p>

            <p className='text-subheading4'>
                6.4 Where a government agency makes a request to obtain information for the purpose of verification of identity, or for prevention, detection, investigation including cyber incidents, prosecution and punishment of offences, the Company may share the personal information without obtaining any prior consent of the User. The Company will be utilising the services of third party service providers such as technical service providers to create and support the Website, third party advertising company etc. The Company may publish or share your non-personal information in order to promote the Website with the Company’s affiliates, various third parties and Company’s service providers without your consent. You are informed that the Company’s third party service providers may utilise information relating to your usage of the Website in order to provide customized services, offers and advertisements to you.
            </p>

            {/* <h2 className='text-heading'>7. International Transfer of Data </h2>
            <p className='text-subheading4'>
                Your information may be stored and processed in the US or other countries or jurisdictions outside the US where Company has facilities. By using Company services, you are permitting and consenting to the transfer of information, including Personal Data, outside of the US.
            </p> */}

            <div>
                <h2 className='text-heading'>7. Notice at Collection: Retention Periods</h2>
                <p className='text-subheading4'>
                    7.1. We retain the categories of personal information we collect for the length of time necessary to provide our Services and to comply with legal obligations, resolve disputes or to protect our legal rights. The criteria used to determine the retention periods include:
                </p>

                <div>
                    <ul>
                        <li>
                            <p className='text-subheading4'>
                                how long the personal information is needed for a particular purpose and to operate the business;
                            </p>
                        </li>
                        <li>
                            <p className='text-subheading4'>
                                the type of personal information collected; and
                            </p>
                        </li>
                        <li>
                            <p className='text-subheading4'>
                                whether we are subject to a legal, contractual or similar obligation to retain the personal information (e.g., mandatory data retention laws, government orders to preserve data relevant to an investigation, or data that must be retained for the purposes of litigation or disputes).
                            </p>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className='text-subheading4'>
                        7.2 We may retain your personal information for an additional period to the extent deletion would require us to overwrite our automated disaster recovery backup systems or to the extent we deem it necessary to assert or defend legal claims during any relevant retention period.
                    </p>
                    <p className='text-subheading4'>
                        7.3 We will also delete your personal information when you withdraw your consent (where applicable), provided that we are not legally required or otherwise permitted to continue to hold such personal information
                    </p>
                </div>
            </div>

            <h2 className='text-heading'>8. Option to withhold / withdraw </h2>
            <p className='text-subheading4'>
                8.1. Prior to collection of the Personal Information (including Sensitive Personal Data), the Website may give you an option to withhold the data/ information sought. Further, you may withdraw the consent given to the Company on the Website, by communicating to the Company in writing. However, such withholding of information or withdrawal of consent may result in the Company being unable to provide the Services and facilities and the Company reserves its right to take appropriate action with respect to any obligations or in relation to any contract under which such Personal Information was sought. It being clarified that such withdrawal of consent shall not affect the permission granted prior to such withdrawal and hence the Company shall not be liable for sharing personal information (as stated herein) in any manner whatsoever.
            </p>

            <div>
                <h2 className='text-heading'>9. Accuracy of and Access to Personal Information</h2>
                <p className='text-subheading4'>
                    9.1. The Company will not be responsible for the accuracy or authenticity of the Personal Information (including Sensitive Personal Data), if any that is provided by you. It is the responsibility of the User to notify the Company through the Website of any changes to their Personal Information. To attain this end, the User may request the Website for reasonable access to, and correction of, their Personal Information collected by the Website by emailing their request/clarification at <span style={{color:'#4563E4'}}>support@airrchip.com</span>. The Company makes good efforts to provide its Users with reasonable access to their respective Personal Information and shall ensure that any Personal Information found to be inaccurate and brought to the notice of the Company by the User is rectified or amended as feasible. The Company may however before processing such requests, ask the User to identify themselves and the information /data requested to be modified by them in order to avoid repetitive and/or illegitimate requests. The Company shall not be responsible for any delay in updating such information.
                </p>
                <p className='text-subheading4'>
                    9.2. In the event a User requests the Company to delete his/her Personal Information and/or his account, the Company shall ensure that such Personal Information/ user account is deleted within reasonable time period of receiving such a request. The Company may however before processing such requests, ask the User to identify themselves and the information /data requested to be deleted by them in order to avoid any illegitimate/bogus requests. Once the Personal Information/ user account is deleted, all data in respect thereof shall cease to be accessible to the User, and the Company may thereafter send an email to such User apprising him/her of such deletion. The User may contact the Company by emailing their request on <span style={{color:'#4563E4'}}>support@airrchip.com</span>
                </p>

                <p className='text-subheading4'>
                    9.3. It is clarified that, after the deletion of the Personal Information/ User account, the Company shall maintain records of the same for a period of 90 (ninety) days after which the same shall be deleted therefrom. It is clarified that even though the Company may maintain records of deleted data for 90 (ninety) days, once the Personal Information/ user account of a particular User has been deleted upon his/her request, the same shall not be retrievable by the User in any manner whatsoever and at any time thereafter.
                </p>

                <p className='text-subheading4'>
                    9.4. The Company may, however, withhold or may not be able to provide information to you for valid reasons including if it:
                </p>

                <div className='subtext-content'>
                    <p className='text-subheading4'>
                        (a)	contains references to another User(s);
                    </p>
                    <p className='text-subheading4'>
                        (b)	is subject to legal/ contractual privilege or cannot be disclosed for other legal reasons;
                    </p>
                    <p className='text-subheading4'>
                        (c)	contains confidential commercial/ business information of the Company or other Users of the Website;
                    </p>
                    <p className='text-subheading4'>
                        (d)	is not maintained by the Company;
                    </p>
                    <p className='text-subheading4'>
                        (e)	was created in the course of a dispute resolution process;
                    </p>
                    <p className='text-subheading4'>
                        (f)	could threaten the life or security of another individual/ entity;
                    </p>
                    <p className='text-subheading4'>
                        (g)	was disclosed under a court order or was disclosed to a government institution as part of an investigation.
                    </p>
                    {/* <p className='text-subheading4'>
                        (h)	in any event where the Company has reason to believe that you are in violation of any applicable law, rule or regulation, or interfering with the rights of any other person;
                    </p>
                    <p className='text-subheading4'>
                        (i)	to any potential investor or purchaser of any interest in the Company or Website or any associated entity or in its business in connection with any potential re-organisation, merger or disposal; and

                    </p>
                    <p className='text-subheading4'>
                        (j)	any lawyer or other professionals for the preparation of any document or professional advice regarding the above.
                    </p> */}
                </div>
            </div>

            <div>
                <h2 className='text-heading'>10. Personal Information of Minors </h2>
                <p className='text-subheading4'>
                    Our website is not directed to minors under the age of 13 and we do not knowingly sell or share the personal information of minors, including minors under 16 years of age.
                </p>

                <h2 className='text-heading'>11. Reasonable security practices and data security </h2>
                <p className='text-subheading4'>
                    11.1. We implement and maintain reasonable security appropriate to the nature of the personal information that we collect, use, retain, transfer or otherwise process.  We take reasonable steps, consistent with generally accepted industry standards, including technical, administrative, and physical safeguards to protect the personal information submitted to us from loss, misuse and unauthorized access, disclosure, alteration and destruction.
                </p>

                <p className='text-subheading4'>
                    11.2. However, there is no perfect security, and reasonable security is a process that involves risk management rather than risk elimination.  While we are committed to maintaining a reasonable information security program, no such program can be perfect; in other words, all risk cannot reasonably be eliminated. Data security incidents and breaches can occur due to factors that cannot reasonably be prevented.  Accordingly, it cannot be assumed that the occurrence of any given incident or breach results from our failure to implement and maintain reasonable security.
                </p>

            </div>

            <div>
                <h2 className='text-heading'>12. Marketing and content updates </h2>
                <p className='text-subheading4'>
                    You will receive marketing and new content communications from us unless you specifically request that you would not like to receive these communications. From time to time we may make suggestions and recommendations to you about goods or services that may be of interest to you.
                </p>
            </div>

            <div>
                <h2 className='text-heading'>13. Changes to This Policy</h2>
                <p className='text-subheading4'>
                    We will review and update this Policy from time to time.  If changes are made, we will update the Privacy Policy and reflect the date of such modification in the date above. If the changes are material, you will be notified through a notice on our website.
                </p>
            </div>

            <div>
                <h2 className='text-heading'>14. Complaints</h2>
                <p className='text-subheading4'>
                    In the event that you are unhappy and or have a grievance with respect to (i) any service/ product or facility that is provided on the Website; and (ii) any other activity that may take place on the Website, or if you have any questions, comments, concerns or feedback regarding this Privacy Policy and/or this Website, you may bring the same to the notice of our Grievance Officer, whose details are given below and/or lodge a complaint with us. We shall ensure that we take all the necessary steps to address your questions, comments, concerns to the best of our abilities.
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy