import { useState, useEffect } from 'react';
import { Member } from '../types/Member';

const MemberList = () => {
  // useStateでユーザー情報を保存するための状態を作成
  const [MemberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE;
        const requestUri = `${API_BASE}/members`;
        const response = await fetch(requestUri, {
          method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        console.log(response.body)
        
        const data = await response.json();
        console.log(data);
        setMemberList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMemberList();
  }, []); 

  return (
    <div>
      <h2>Members</h2>
      {MemberList && MemberList.map((m: Member) => {
        return (
          <div className="card">
            <p>{m.email}</p>
            <p>{m.name}</p>
          </div>
        )
      })}
    </div>
  );
};

export default MemberList;
