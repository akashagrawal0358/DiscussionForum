import React, { useState } from 'react';
import '../styles/TopicForm.css'
import axios from 'axios';

function TopicForm() {
    const [topic, setTopic] = useState('');

    const handleTopicSubmit = async (e) => {
      e.preventDefault();
  
      // Create an object with the topic data to send to the server
      const topicData = {
        text: topic,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/topics', topicData);
  
        if (response.status === 201) {
        
          console.log('Topic posted:', response.data);
        } else {
            
        }
      } catch (error) {
        
        console.error(error);
      }
    };
  
  return (

   


    <div className="topic-form">
      <h2>Post a Topic for discussions</h2>
      <form onSubmit={handleTopicSubmit}>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic here"
          rows="4"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TopicForm;
