import { useState, useEffect } from "react";
import { Member } from "../types/Member";
import { useNavigate } from "react-router-dom";

const MemberList = () => {
  // useStateでユーザー情報を保存するための状態を作成
  const [MemberList, setMemberList] = useState([]);
  const idToken = sessionStorage.idToken.toString();

  useEffect(() => {
    console.log(idToken);
    const fetchMemberList = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE;
        const requestUri = `${API_BASE}/members`;
        const response = await fetch(requestUri, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        console.log(response.body);

        const data = await response.json();
        console.log(data);
        setMemberList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMemberList();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h2>Members</h2>
      {MemberList &&
        MemberList.map((m: Member) => {
          return (
            <div className="card">
              <p>{m.email}</p>
              <p>{m.name}</p>
            </div>
          );
        })}

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default MemberList;
