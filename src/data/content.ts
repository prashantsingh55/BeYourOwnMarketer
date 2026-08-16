import { CurriculumDay, OnlineCourse, BlogPost, GalleryItem, Seat, Mentor } from '../types';

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDIdDRjpqzKAwCWyq8Z99r3UsGpbf3DIjXhhG_FF6NIzV42cpO0Fkd8d_mClHg27QTughLAFpFEMaGM_Kyq15LA3aLFuT84jaIT5SlvyZdwDD7wWBBXmxgKNObyrYPYEsr9s6NyG9KsxLr4nuekOQrn8qzyaSNrkULzHYMnWpDSKE8XDDSqWQveilNPGpaHMTgx7aqLVAo7jJt3ZbRPGw309aYJXn2waIVUxOgeJ1665DiU3iFm72EY';

export const WORKSHOP_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUqZE2OgBpiPbuXw4lK3k8C_JjT0U6Zop_unq2xQJ4yqV5mmDkujlSFkkIb11EtSc2lz7ucBmzBLGqHGLTzQsp6jiqXRM439qOYylqdxa3OzFqs0Q9tFBvd8QjV19Qs6p969E5lm27Le38yacCHdUMWV6SvqKOuJWFVJhiDOZnpnG4qfWIfEzZhzQcJvAawKzinzbdqELDmFxWlp2vG0ByeTaUtAFvT1xCLA7BnUlsCFnT-8oN47-W';

export const curriculumDays: CurriculumDay[] = [
  {
    day: 1,
    title: {
      en: 'Marketing & Idea Generation',
      np: 'मार्केटिङ र विचार उत्पादन',
    },
    description: {
      en: 'Warm-up session, foundational marketing principles & idea generation, Raw & Real sharing, and hands-on concept building.',
      np: 'वार्म-अप सत्र, आधारभूत मार्केटिङ सिद्धान्त र विचार उत्पादन, रो र रियल अनुभव आदानप्रदान र व्यावहारिक विचार निर्माण।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Marketing & Idea Generation', np: 'मार्केटिङ र विचार उत्पादन' }, instructor: 'Chris Gurung' },
      { time: '6:45 am - 7:15 am', title: { en: 'Raw & Real', np: 'रो र रियल' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Content Writing (Practical)', np: 'सामग्री लेखन (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Marketing & Idea Generation', np: 'मार्केटिङ र विचार उत्पादन' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Raw & Real', np: 'रो र रियल' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Concept building (Practical)', np: 'विचार निर्माण (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Marketing & Idea Generation', np: 'मार्केटिङ र विचार उत्पादन' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Raw & Real', np: 'रो र रियल' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Concept building (Practical)', np: 'विचार निर्माण (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    topics: {
      en: ['Marketing Fundamentals', 'Idea Generation Techniques', 'Raw & Real Discussions', 'Practical Concept Building'],
      np: ['मार्केटिङ आधारभूत', 'विचार उत्पादन विधि', 'रो र रियल छलफल', 'व्यावहारिक विचार निर्माण'],
    },
  },
  {
    day: 2,
    title: {
      en: 'Shoot Like a Pro',
      np: 'प्रो जस्तै सुटिङ गर्नुहोस्',
    },
    description: {
      en: 'Professional smartphone videography techniques, overcoming camera shyness, framing angles, and practical shooting lab.',
      np: 'व्यावसायिक स्मार्टफोन भिडियोग्राफी प्रविधि, क्यामेरा डर हटाउने, फ्रेमिङ कोण र व्यावहारिक सुटिङ अभ्यास।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Shoot like a pro', np: 'प्रो जस्तै सुटिङ' }, instructor: 'Chris Gurung' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Shoot like a pro (Practical)', np: 'प्रो जस्तै सुटिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'shoot like a pro', np: 'प्रो जस्तै सुटिङ' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'shoot like a pro (Practical)', np: 'प्रो जस्तै सुटिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'shoot like a pro', np: 'प्रो जस्तै सुटिङ' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'shoot like a pro (Practical)', np: 'प्रो जस्तै सुटिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    topics: {
      en: ['Smartphone Camera Settings', 'Lighting & Framing', 'Open-Up Speaking Exercises', 'Practical Shoot Lab'],
      np: ['स्मार्टफोन क्यामेरा सेटिङ', 'लाइटिङ र फ्रेमिङ', 'ओपन-अप बोल्ने अभ्यास', 'व्यावहारिक सुटिङ ल्याब'],
    },
  },
  {
    day: 3,
    title: {
      en: 'Edit Smart, Edit Fast',
      np: 'स्मार्ट र द्रुत सम्पादन',
    },
    description: {
      en: 'Mastering mobile video editing hacks, fast cuts, transitions, sound design, and practical editing exercises.',
      np: 'मोबाइल भिडियो सम्पादन ट्रिक्स, द्रुत कट्स, ट्रान्सिसन, साउन्ड डिजाइन र व्यावहारिक सम्पादन अभ्यास।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Edit Smart, Edit Fast', np: 'स्मार्ट सम्पादन, द्रुत सम्पादन' }, instructor: 'Chris Gurung' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Editing Practical', np: 'सम्पादन (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Edit Smart, Edit Fast', np: 'स्मार्ट सम्पादन, द्रुत सम्पादन' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open- Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Editing Practical', np: 'सम्पादन (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Edit Smart, Edit Fast', np: 'स्मार्ट सम्पादन, द्रुत सम्पादन' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open- Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Editing Practical', np: 'सम्पादन (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    topics: {
      en: ['Mobile Editing Workflows', 'Keyframes & Transitions', 'Audio Overlay & SFX', 'Practical Video Editing'],
      np: ['मोबाइल सम्पादन कार्यप्रवाह', 'कीफ्रेम र ट्रान्सिसन', 'अडियो ओभरले र प्रभाव', 'व्यावहारिक भिडियो सम्पादन'],
    },
  },
  {
    day: 4,
    title: {
      en: 'Make Your Own Graphics',
      np: 'आफ्नो ग्राफिक आफैँ बनाउनुहोस्',
    },
    description: {
      en: 'Designing marketing graphics, banners, and social posts with proper color harmony, typography, and practical design.',
      np: 'उचित रङ सन्तुलन, फन्ट छनोट र व्यावहारिक डिजाइनका साथ मार्केटिङ ग्राफिक्स र ब्यानरहरू बनाउने।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Make Your Own Graphics', np: 'आफ्नो ग्राफिक बनाउनुहोस्' }, instructor: 'Prashant Ghimire' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Graphic Practical', np: 'ग्राफिक (व्यावहारिक)' }, instructor: 'Prashant Ghimire' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Make Your Own Graphics', np: 'आफ्नो ग्राफिक बनाउनुहोस्' }, instructor: 'Prashant Ghimire' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Graphics', np: 'ग्राफिक्स (व्यावहारिक)' }, instructor: 'Prashant Ghimire' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Make Your Own Graphics', np: 'आफ्नो ग्राफिक बनाउनुहोस्' }, instructor: 'Prashant Ghimire' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Graphics', np: 'ग्राफिक्स (व्यावहारिक)' }, instructor: 'Prashant Ghimire' },
    ],
    topics: {
      en: ['Graphic Design Rules', 'Color & Font Pairing', 'Open-Up Dialogue', 'Practical Banner Design'],
      np: ['ग्राफिक डिजाइन नियम', 'रङ र फन्ट छनोट', 'ओपन-अप संवाद', 'व्यावहारिक ब्यानर डिजाइन'],
    },
  },
  {
    day: 5,
    title: {
      en: 'Post For Reach & Result',
      np: 'पहुँच र परिणामका लागि पोस्टिङ',
    },
    description: {
      en: 'Content publishing strategies for maximum organic reach, algorithmic hooks, caption writing, and practical posting.',
      np: 'अधिकतम अर्गानिक पहुँचका लागि पोस्टिङ रणनीति, क्याप्शन लेखन र व्यावहारिक पोस्टिङ अभ्यास।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Post For Reach & Result', np: 'पहुँच र परिणामका लागि पोस्टिङ' }, instructor: 'Chris Gurung' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Content Posting Practical', np: 'सामग्री पोस्टिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Post For Reach & Result', np: 'पहुँच र परिणामका लागि पोस्टिङ' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Content Posting Practical', np: 'सामग्री पोस्टिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Post For Reach & Result', np: 'पहुँच र परिणामका लागि पोस्टिङ' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Content Posting Practical', np: 'सामग्री पोस्टिङ (व्यावहारिक)' }, instructor: 'Chris Gurung' },
    ],
    topics: {
      en: ['Organic Reach Hacks', 'Hashtag & Hook Strategy', 'Open-Up Session', 'Live Content Posting'],
      np: ['अर्गानिक पहुँच विधि', 'ह्यासट्याग र हुक रणनीति', 'ओपन-अप सत्र', 'लाइभ सामग्री पोस्टिङ'],
    },
  },
  {
    day: 6,
    title: {
      en: 'Introduction to Meta Boosting ',
      np: 'मेटा बुस्टिङको परिचय ',
    },
    description: {
      en: 'Setting up Meta ad boosts, audience location & interest targeting, open-up feedback, and practical live ad setup.',
      np: 'मेटा विज्ञापन बुस्ट स्थापना, लक्षित दर्शक र रुचि छनोट, र प्रत्यक्ष मेटा बुस्टिङ व्यावहारिक प्रयोग।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Meta Boosting', np: 'मेटा बुस्टिङ' }, instructor: 'Prashant B. Singh' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Meta Boosting (Practical)', np: 'मेटा बुस्टिङ (व्यावहारिक)' }, instructor: 'Prashant B. Singh' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Meta Boosting', np: 'मेटा बुस्टिङ' }, instructor: 'Prashant B. Singh' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Meta Boosting (Practical)', np: 'मेटा बुस्टिङ (व्यावहारिक)' }, instructor: 'Prashant B. Singh' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Meta Boosting', np: 'मेटा बुस्टिङ' }, instructor: 'Prashant B. Singh' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Meta Boosting (Practical)', np: 'मेटा बुस्टिङ (व्यावहारिक)' }, instructor: 'Prashant B. Singh' },
    ],
    topics: {
      en: ['Page Boost Setup', 'Target Audience Selection', 'Budget Optimization', 'Live Meta Ad Setup'],
      np: ['पेज बुस्ट सेटअप', 'लक्षित दर्शक छनोट', 'बजेट व्यवस्थापन', 'लाइभ मेटा विज्ञापन'],
    },
  },
  {
    day: 7,
    title: {
      en: 'Revise & Practical Masterclass',
      np: 'पुनरावलोकन र व्यावहारिक मास्टरक्लास',
    },
    description: {
      en: 'Comprehensive recap of all 7 days, open-up Q&A reflections, masterclass practical execution, and certificate distribution.',
      np: 'सबै ७ दिनको समग्र पुनरावलोकन, खुला छलफल र प्रश्नोत्तर, व्यावहारिक मास्टरक्लास र प्रमाणपत्र प्रदान।',
    },
    timeRangeMorning: '6:00 am - 9:00 am',
    timeRangeDaytime: '12:00 pm - 3:00 pm',
    timeRange: '6:00 am - 9:00 am | 12:00 pm - 3:00 pm',
    location: 'ROKPA Guest House, Boudha',
    sessionsMorning: [
      { time: '6:00 am - 6:15 am', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '6:15 am - 6:45 am', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
      { time: '6:45 am - 7:15 am', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '7:15 am - 8:00 am', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
    ],
    sessionsDaytime: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
    ],
    sessions: [
      { time: '12:00 pm - 12:15 pm', title: { en: 'Warm-Up', np: 'वार्म-अप' } },
      { time: '12:15 pm - 12:45 pm', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
      { time: '12:45 pm - 1:15 pm', title: { en: 'Open-Up', np: 'ओपन-अप' }, instructor: 'Umesh Tamang' },
      { time: '1:15 pm - 2:00 pm', title: { en: 'Revise & Practical', np: 'पुनरावलोकन र व्यावहारिक' }, instructor: 'Chris Gurung' },
    ],
    topics: {
      en: ['Weekly Review', 'Open-Up Reflections', 'Comprehensive Practical Lab', 'Graduation & Certificate'],
      np: ['साप्ताहिक पुनरावलोकन', 'ओपन-अप छलफल', 'पूर्ण व्यावहारिक अभ्यास', 'दीक्षान्त तथा प्रमाणपत्र'],
    },
  },
];



export const blogPosts: BlogPost[] = [
  {
    id: 'meta-ads-2024-saas',
    featured: true,
    title: {
      en: 'The Ultimate Guide to Meta Ads in 2024: Scaling Your SaaS & E-Commerce',
      np: '२०२४ मा मेटा विज्ञापनहरूको अन्तिम मार्गदर्शिका: SaaS र इ-कमर्सको विस्तार',
    },
    category: {
      en: 'Digital Marketing',
      np: 'डिजिटल मार्केटिङ',
    },
    categorySlug: 'digital-marketing',
    summary: {
      en: 'Master the new AI-driven algorithms. Discover how top-tier corporate marketing teams are leveraging automated targeting to drive unprecedented ROAS in competitive markets.',
      np: 'नयाँ एआई-संचालित एल्गोरिदमहरूमा निपुणता प्राप्त गर्नुहोस्। शीर्ष कर्पोरेट टोलीहरूले प्रतिस्पर्धी बजारमा उच्च ROAS हासिल गर्न स्वचालित लक्षित कसरी प्रयोग गरिरहेका छन् हेर्नुहोस्।',
    },
    content: {
      en: `Meta's ad ecosystem underwent massive shifts in 2024 with Advantage+ Shopping and AI Campaign budgets. For Nepali businesses entering international or regional scaling, relying solely on broad targeting is no longer sufficient.

### Key Strategies for 2024:
1. **Dynamic Creative Optimization (DCO):** Test 5 hooks, 3 primary texts, and 3 headlines per ad set.
2. **First-Party Data Integration:** Implement Conversions API (CAPI) alongside standard Meta Pixel to recover lost signal data.
3. **Localized Hook Design:** Speak directly to regional consumer triggers using relatable story frameworks.`,
      np: `मेटाको विज्ञापन प्रणालीमा एडभान्टेज+ सपिङ र एआई बजेट प्रणालीको साथ ठूलो परिवर्तन आएको छ। अन्तर्राष्ट्रिय वा क्षेत्रीय बजारमा अघि बढ्न चाहने नेपाली व्यवसायहरूका लागि सामान्य लक्षितमा मात्र निर्भर रहनु अब पर्याप्त छैन।

### प्रमुख रणनीतिहरू:
१. **गतिशील रचनात्मक अनुकूलन (DCO):** हरेक विज्ञापन सेटमा ५ वटा हुक, ३ वटा प्रमुख विवरण र ३ वटा हेडलाइन परीक्षण गर्नुहोस्।
२. **फर्स्ट-पार्टी डेटा एकीकरण:** हराएको डेटा प्राप्त गर्न मानक मेटा पिक्सेलको साथ कन्भर्जन्स एपीआई (CAPI) लागू गर्नुहोस्।
३. **स्थानीयकृत हुक डिजाइन:** क्षेत्रीय उपभोक्ताको व्यवहार अनुसार सीधा प्रभाव पार्ने कथा ढाँचा प्रयोग गर्नुहोस्।`,
    },
    readTime: '5 min read',
    date: 'Oct 24, 2024',
    author: {
      name: 'BYOM Team',
      role: 'Lead Growth Marketers',
      avatar: 'B',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjCR9rz8croBVBklYbXxvOInAh0AYOaoKqMid_XlNpf0zCynDfWuvCkUV1vSkO7ov14P6NwUZzlcocTmOXFCf_rp_CMdjgMz4ckdhnIXjdAdaGJ46K7wURWp7tdc_h3aUIvJxYQreHSyahUZSNAcKT_yDaLUoakDFK_XQIas95fLXylsx4TNElYOSFNFdK7puPNanT4JlRtTVh_o-RvGl_yPSGAzQzozJmsJWJRTyg0iQXpU9htZmp',
  },
  {
    id: 'prompt-engineering-marketers',
    title: {
      en: 'Prompt Engineering for Marketers: Saving 10 Hours a Week',
      np: 'मार्केटरहरूका लागि प्रम्प्ट इन्जिनियरिङ: हप्तामा १० घण्टा बचत',
    },
    category: {
      en: 'AI Tools',
      np: 'एआई उपकरणहरू',
    },
    categorySlug: 'ai-tools',
    summary: {
      en: 'Stop writing generic copy. Learn the frameworks that produce high-converting ad copy, landing pages, and email hooks instantly using Gemini & Claude.',
      np: 'साधारण कपि लेख्न छाड्नुहोस्। जेमिनी र क्लाउड प्रयोग गरी उच्च-रूपान्तरण विज्ञापन कपि र ल्यान्डिङ पेजहरू तुरून्तै बनाउने फ्रेमवर्क सिक्नुहोस्।',
    },
    content: {
      en: `AI doesn't replace marketers; marketers using AI replace those who don't. By structuring your prompts with Context, Persona, Task, Format, and Constraints (CPTFC framework), you can turn generative models into tireless copywriting assistants.`,
      np: `एआईले मार्केटरलाई प्रतिस्थापन गर्दैन; एआई प्रयोग गर्ने मार्केटरले प्रयोग नगर्नेहरूलाई विस्थापित गर्छन्। सन्दर्भ, भूमिका, कार्य, ढाँचा र सीमाहरू मिलाएर प्रम्प्ट तयार गर्दा एआई मोडेलहरूबाट उत्कृष्ट नतिजा निकाल्न सकिन्छ।`,
    },
    readTime: '3 min read',
    date: 'Oct 20, 2024',
    author: {
      name: 'Aayush Shrestha',
      role: 'AI & Automation Lead',
      avatar: 'A',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI6VPKHWwMqTrsGEDSM0Dwz6_6PqNRlC7U3jftzoJTGtiTN4xRniGcCGwOBQW2nItrMIaaANGGTCYw-ekpeq2mT8aeyXnKW7XHVwOEfzLwSWxoRj7uyeeC_qdzI5u6k7k6v2V40P__8lz8e7JLr8Zw_e4OP3POCdKCE4IHe9XHWTylpflbOwUwlQojna8mcYoMJ1U6Uw9rB4-lb3Mkq19UNMJy7FtPknp1QLnQqsuM0ccgYDHdoUzm',
  },
  {
    id: 'building-trust-nepali-corporate',
    title: {
      en: 'Building Trust in the Nepali Corporate Sector',
      np: 'नेपाली कर्पोरेट क्षेत्रमा विश्वास निर्माण',
    },
    category: {
      en: 'Branding',
      np: 'ब्रान्डिङ',
    },
    categorySlug: 'branding',
    summary: {
      en: 'How to balance traditional corporate authority with modern digital accessibility in your brand guidelines and social channels.',
      np: 'आफ्नो ब्रान्ड दिशानिर्देश र सामाजिक च्यानलहरूमा परम्परागत कर्पोरेट अधिकार र आधुनिक डिजिटल पहुँचबीच कसरी सन्तुलन मिलाउने।',
    },
    content: {
      en: `Nepali B2B and consumer brands face a unique tension: consumers demand modern, humanized communication, while boardrooms favor traditional formality. Bridging this gap requires transparent proof points, authentic video storytelling, and consistent visual identity.`,
      np: `नेपाली बी२बी र उपभोक्ता ब्रान्डहरूले अनौठो अवस्थाको सामना गरिरहेका छन्: उपभोक्ताहरू आधुनिक, मानवीय सञ्चार चाहन्छन्, जबकि व्यवस्थापनले परम्परागत औपचारिकता मन पराउँछ। यसलाई जोड्न पारदर्शी प्रमाण, भिडियो कथावाचन र एकरूप दृश्य पहिचान आवश्यक छ।`,
    },
    readTime: '4 min read',
    date: 'Oct 15, 2024',
    author: {
      name: 'Pooja Thapa',
      role: 'Brand Strategist',
      avatar: 'P',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAcPah0c6N8HcU3eeJQiwHxuS-wes0Wn-I2Y1oH7LUSq9pFdpu8U7L_mcv7uQMU9v7sUsHKBEKLUQ7ceh52RKq7SD94XqPV12TeE8z8uEm8lMvc0A2mP6j-nuiP5AEGDkwJmyRA75Xoeru9D-OFSNMcBxTvD8tr416DxQzo6xsuHO3Dp8eMUxGKyxZfEkxMG_evdYyhrnP93NBS1FltTbJf9MEAoulPhjnIbz_2xd33tZFZic4xRKEo',
  },
  {
    id: 'creative-fatigue-refresh-ads',
    title: {
      en: 'Creative Fatigue: How Often Should You Refresh Ads?',
      np: 'रचनात्मक थकान: विज्ञापन कति पटक परिवर्तन गर्ने?',
    },
    category: {
      en: 'Facebook Ads',
      np: 'फेसबुक विज्ञापनहरू',
    },
    categorySlug: 'facebook-ads',
    summary: {
      en: 'Data-backed strategies on when to cycle creatives to maintain performance and avoid audience burnout in Nepal market.',
      np: 'नेपालको बजारमा राम्रो प्रदर्शन कायम राख्न र दर्शकहरूको अझै रुचि राखिरहन कति बेला नयाँ विज्ञापन प्रयोग गर्ने भन्ने रणनीतिक जानकारी।',
    },
    content: {
      en: `When frequency crosses 3.5x in smaller geographical targets like Kathmandu Valley, Ad Recall drops sharply while Cost Per Lead spikes. Cycling new video hooks every 10–14 days prevents audience exhaustion.`,
      np: `काठमाडौँ उपत्यका जस्ता साना भौगोलिक क्षेत्रहरूमा फ्रिक्वेन्सी ३.५ गुणा नाघेपछि लिड लागत बढ्छ। हरेक १०-१४ दिनमा नयाँ भिडियो हुकहरू प्रयोग गर्नाले विज्ञापनको प्रभावकारिता कायम रहन्छ।`,
    },
    readTime: '6 min read',
    date: 'Oct 10, 2024',
    author: {
      name: 'BYOM Team',
      role: 'Paid Acquisition Specialists',
      avatar: 'B',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx4KlfOvOAZaWvSUIIWGS24MekC52djhLxH0ILtophrpWy-orufqCtSTLUESzgL4NiItAxUtT9VwIboWB6wPMFeYUeesknNY4NYaWaLS2yf9M4zPsROFciDeJHqvGCfRVgwmAvOz3b3NrnsYC0zEYYD-HwX22YXHmUbOZP8RrpXhb4FnZBgkZvldFBlyf_q8gE9kHcSFt-Q1pGZmMhQluHkuk5LXAfSjRT4SqRrG2rF1kKkITUQ0ha',
  },
  {
    id: 'attribution-models-explained-c-suite',
    title: {
      en: 'Attribution Models Explained for C-Suite',
      np: 'सञ्चालक समितिका लागि एट्रिब्युसन मोडेलहरूको व्याख्या',
    },
    category: {
      en: 'Digital Marketing',
      np: 'डिजिटल मार्केटिङ',
    },
    categorySlug: 'digital-marketing',
    summary: {
      en: 'Translating complex multi-touch attribution into reports your stakeholders will actually understand and approve.',
      np: 'जटिल मल्टि-टच एट्रिब्युसनलाई शेयरधनीहरूले सजिलै बुझ्ने र स्वीकृत गर्ने प्रतिवेदनमा रूपान्तरण गर्ने तरिका।',
    },
    content: {
      en: `Connecting marketing spend to bottom-line revenue requires moving away from Last-Touch attribution toward Data-Driven or Position-Based models that accurately credit top-of-funnel content.`,
      np: `मार्केटिङ खर्चलाई वास्तविक आम्दानीसँग जोड्न लास्ट-टच मोडेलबाट डेटा-ड्राइभन वा पोजिसन-बेस्ड मोडेलहरूमा सर्नु आवश्यक छ।`,
    },
    readTime: '7 min read',
    date: 'Oct 05, 2024',
    author: {
      name: 'Nabin Gurung',
      role: 'Analytics Consultant',
      avatar: 'N',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqVaDytgX0iOITIx06kJlTZtSG1wZ9Fh-RMRhXiSuS5DtZv0UOvaeXx-nlTieakRMG18dWpvXu_yE8IMyjX0ymhK9R5u6gRpPc-A4wTYFgEzxtggX2yaCJ7qOH1LwkmxI-ThDOeh54s1yP6s7Wu1z64Xs-yL_r82yyemImhHc0l1kUgUtZG0qCT1Fo9LnDp8soExCMEwHrUJ_EvS0dQv_PaD4K6QNEFiDgiJjAC6n2gg1Sn_1c8bxi',
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: {
      en: 'Digital Marketing Workshop 2024',
      np: 'डिजिटल मार्केटिङ कार्यशाला २०२४',
    },
    category: 'training',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-sNM1JrvLkgm_RMKJGhIrXZmFUCTGRbpuarcLToHyDaKqukUCCjnr9mMXmgRsMDn7csVO1oRVivVkz52rC9mNt79O5XvES-llrzGMIE6yJN02yKNT8fUU8HETkvTU5CKWXNB9N6aXayE_Tynj-IsZkemanBKN9m9DjGUUFyb4q8UjN4qfZJOKXaNvt5qwos65rIGqVIU6xHsnLzt4i3t02sluEF8nphZnE9BuKFLFzFELLkQBANV',
    aspect: 'portrait',
    date: '2024-03-12',
  },
  {
    id: 'gallery-2',
    title: {
      en: 'Certificate of Excellence Award Ceremony',
      np: 'उत्कृष्टता प्रमाणपत्र वितरण समारोह',
    },
    category: 'students',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6nA2IuO67iB_UWnADgjyTDtr1iyTIhrWh_hjZGh2oG-fikRMh4BjWlP8d2dwV1uH0j_pHP1zz8KIT28gDAwt7qHkH6Lp1vr5HVN69Nklb_KtlXrdgdRWdp5_pVaZ7pnNkuC4n2PYb_ihkjG-5yvu1AMJC259ppL2E6FuskAMS5je1UyxeTeYT4u3IRdmpkKQsyzvNVmMRHaM1yQCKka-y-X9BiLBtw4vu0KR1EteAYTbFImbuNG8M',
    aspect: 'square',
    date: '2024-03-10',
  },
  {
    id: 'gallery-3',
    title: {
      en: 'Kathmandu Campus Strategy Seminar',
      np: 'काठमाडौँ क्याम्पस रणनीति गोष्ठी',
    },
    category: 'workshops',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDpbe6fHnrOoqHXoOtv-RamN-fa55EedPhegCgUSMqv_08EAefxA4L0Vv4Ch7yK4HkXSv1O9q-vSzPnHha0maQe4nqHH5hUIHXKU9jDzeBnouDuDetL-y00i3nioSh_r5_WSj4x0_4F9GZ5KcnJ6T4wx4Nus41lKYhZRv4EaoGY2MfDMJbBm9Ik_c3n6wLfIL8AUfEpXRxzMIhOmVWUmoQKHrj0WOeB9lF8MDqKqxLb3SEhlrshdYC7',
    aspect: 'landscape',
    date: '2024-02-28',
  },
  {
    id: 'gallery-4',
    title: {
      en: 'Behind the Scenes: Video Recording Studio',
      np: 'दृश्य पर्दा पछाडि: भिडियो रेकर्डिङ स्टुडियो',
    },
    category: 'videos',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXovczP63BSPJ0gPO0eEcRD6_bdNSGVe8j5Rpx-iyMZqDeAhbAmn20wBgxnHcGxoEgL2F7bv-OELT5c6DGul9WgUELS6viitsy2ZAKjze2TI1oIBt42PmUI5dEL8rFAR9fcTZZmzy-Bk3_wy0RWkCRfBBlS6u_OMYAirdotOdTKKzgQ24X-BzTHZMUAhbfchNw9PC2WHJjxi-m4JTbEUXJwcd7i9ff2m_bRZX875Z3UvPf-VteIKQN',
    aspect: 'landscape',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    date: '2024-02-20',
  },
  {
    id: 'gallery-5',
    title: {
      en: '1-on-1 Executive Mentorship Session',
      np: '१-मा-१ कार्यकारी मेन्टरशिप सत्र',
    },
    category: 'events',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_-mow7IdkZkEPGFplQDFnSESx3hT1ZdGl-AdM6IP6D-l9GtrB8iMK1NyIO4E_B2UNLvp6_3lrCJ037qDWiCFAnCISDEz6XgM1s0GRawL2R475zyRxmJNzCc1_5vVywIoZd1aNM5ZZQ7lGANSvzYCulEOA16SHVnZK5CmU2PasIrH7p772Oo1GahesO_sJFyaIksTlT5tJ2zT0e4jmXhFvbgDKp5tFQgq1KfETo3VF7m3VO2MLU-o7',
    aspect: 'portrait',
    date: '2024-02-14',
  },
  {
    id: 'gallery-6',
    title: {
      en: 'Cohort 12 Graduation Celebration',
      np: 'कोहोर्ट १२ दीक्षान्त उत्सव',
    },
    category: 'students',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBEK4VgmcYmTKjGcJ1TrX_SzaApc2LK4WO2Hi_mbQCWoHnxN2xvORhovKo3gk2xwqPmN_3Dy4Y0DTe9zeu84oCt4bg8NyStOvubwdaYi7X6Is9LgEjqq5Rl4gfuSoECp8hR78oQSmKg1RU_ePJ5rDbaQxYB6y49C8sQA114eL8lnt_pHEe-VhmorLD96JX9n9BGch86FHAgNfS7bS4EI4pfF10eIhOYXqLscmD1Rb5cONHFjBpnWNfu',
    aspect: 'square',
    date: '2024-01-30',
  },
];

export const initialSeatData: Seat[] = [
  // Row A (VIP — front row)
  { id: 'A1', seatLabel: 'A1', row: 'A', number: 1, status: 'available', isVip: true, priceNpr: 15000 },
  { id: 'A2', seatLabel: 'A2', row: 'A', number: 2, status: 'available', isVip: true, priceNpr: 15000 },
  { id: 'A3', seatLabel: 'A3', row: 'A', number: 3, status: 'booked',    isVip: true, priceNpr: 15000 },
  { id: 'A4', seatLabel: 'A4', row: 'A', number: 4, status: 'booked',    isVip: true, priceNpr: 15000 },
  { id: 'A5', seatLabel: 'A5', row: 'A', number: 5, status: 'available', isVip: true, priceNpr: 15000 },

  // Row B
  { id: 'B1', seatLabel: 'B1', row: 'B', number: 1, status: 'available', priceNpr: 15000 },
  { id: 'B2', seatLabel: 'B2', row: 'B', number: 2, status: 'available', priceNpr: 15000 },
  { id: 'B3', seatLabel: 'B3', row: 'B', number: 3, status: 'available', priceNpr: 15000 },
  { id: 'B4', seatLabel: 'B4', row: 'B', number: 4, status: 'selected',  priceNpr: 15000 },
  { id: 'B5', seatLabel: 'B5', row: 'B', number: 5, status: 'booked',    priceNpr: 15000 },

  // Row C
  { id: 'C1', seatLabel: 'C1', row: 'C', number: 1, status: 'available', priceNpr: 15000 },
  { id: 'C2', seatLabel: 'C2', row: 'C', number: 2, status: 'available', priceNpr: 15000 },
  { id: 'C3', seatLabel: 'C3', row: 'C', number: 3, status: 'available', priceNpr: 15000 },
  { id: 'C4', seatLabel: 'C4', row: 'C', number: 4, status: 'available', priceNpr: 15000 },
  { id: 'C5', seatLabel: 'C5', row: 'C', number: 5, status: 'available', priceNpr: 15000 },

  // Row D
  { id: 'D1', seatLabel: 'D1', row: 'D', number: 1, status: 'available', priceNpr: 15000 },
  { id: 'D2', seatLabel: 'D2', row: 'D', number: 2, status: 'available', priceNpr: 15000 },
  { id: 'D3', seatLabel: 'D3', row: 'D', number: 3, status: 'available', priceNpr: 15000 },
  { id: 'D4', seatLabel: 'D4', row: 'D', number: 4, status: 'available', priceNpr: 15000 },
  { id: 'D5', seatLabel: 'D5', row: 'D', number: 5, status: 'available', priceNpr: 15000 },

  // Row E (back row)
  { id: 'E1', seatLabel: 'E1', row: 'E', number: 1, status: 'available', priceNpr: 15000 },
  { id: 'E2', seatLabel: 'E2', row: 'E', number: 2, status: 'available', priceNpr: 15000 },
  { id: 'E3', seatLabel: 'E3', row: 'E', number: 3, status: 'available', priceNpr: 15000 },
  { id: 'E4', seatLabel: 'E4', row: 'E', number: 4, status: 'available', priceNpr: 15000 },
  { id: 'E5', seatLabel: 'E5', row: 'E', number: 5, status: 'available', priceNpr: 15000 },
];


export const mentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Suman Pokhrel',
    role: {
      en: 'Founder & Head of Growth',
      np: 'संस्थापक तथा वृद्धि प्रमुख',
    },
    expertise: ['Meta Ads', 'Funnel Strategy', 'Growth Hacking'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: {
      en: '8+ years scaling digital brands in Nepal and Southeast Asia. Managed over $500k in ad spend.',
      np: 'नेपाल र दक्षिणपूर्वी एशियामा ८+ वर्ष डिजिटल ब्रान्ड विस्तार गरेको अनुभव। $५००k भन्दा बढी विज्ञापन खर्च व्यवस्थापन।',
    },
  },
  {
    id: 'm2',
    name: 'Anjalika Adhikari',
    role: {
      en: 'Lead Video Producer & Creator',
      np: 'प्रमुख भिडियो निर्माता र क्रिएटर',
    },
    expertise: ['CapCut', 'Short-form Content', 'Storytelling'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: {
      en: 'Created viral video campaigns with over 25M+ views on TikTok and Reels for top Nepali brands.',
      np: 'शीर्ष नेपाली ब्रान्डहरूका लागि टिकटक र रिल्समा २५M+ भन्दा बढी भ्युज प्राप्त भाइरल भिडियो अभियानहरू निर्माण गरेको।',
    },
  },
  {
    id: 'm3',
    name: 'Rohan Shrestha',
    role: {
      en: 'E-commerce & Analytics Lead',
      np: 'इ-कमर्स र एनालिटिक्स प्रमुख',
    },
    expertise: ['Shopify', 'Conversion Optimization', 'Google Analytics 4'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: {
      en: 'Helped 40+ local businesses setup automated fulfillment and performance marketing pipelines.',
      np: '४० भन्दा बढी स्थानीय व्यवसायहरूलाई स्वचालित पूर्ति र कार्यसम्पादन मार्केटिङ पाइपलाइन स्थापना गर्न मद्दत गरेको।',
    },
  },
];
