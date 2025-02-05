import  { useState } from 'react';
import toast from 'react-hot-toast';

const NoticeForm = () => {
  const [notice, setNotice] = useState('');

  const handleChange = (e) => {
    setNotice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can use 'notice' state
    console.log('Notice:', notice);
    fetch('/api/notice/notices', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notice })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        toast.success('Notice created successfully');
        setNotice('');
    }
    )
    .catch((error) => {
        console.error('Error:', error);
        toast.error('Error creating notice');
    }
    );
    setNotice('');
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notice">
            Notice
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notice"
            type="text"
            placeholder="Enter notice here..."
            value={notice}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
