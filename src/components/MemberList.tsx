import { useState, useEffect } from "react";
import { Member } from "../types/Member";
import { useNavigate } from "react-router-dom";
import { Button, Flex, View } from "@aws-amplify/ui-react";
import MemberCard from "./MemberCard";
import ErrorCard from "./ErrorCard";

const MemberList = () => {
  // useStateでユーザー情報を保存するための状態を作成
  const [MemberList, setMemberList] = useState([]);
  const [errorState, setErrorState] = useState<unknown>(null);
  const idToken = sessionStorage.idToken.toString();

  useEffect(() => {
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
        const data = await response.json();
        setMemberList(data);
      } catch (err) {
        setErrorState(err);
      }
    };

    fetchMemberList();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const sampleMember: Member = {
    id: 0,
    name: "Sample",
    role: "Basic",
    email: "sample@test.com",
    image_url: "",
  };

  return (
    <View width="40rem">
      <h2>Members</h2>
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        alignContent="flex-start"
        wrap="wrap"
        gap="1rem"
      >
        {MemberList &&
          MemberList.map((m: Member) => {
            return <MemberCard member={m} />;
          })}
        {errorState != null && (
          <View>
            <ErrorCard errorMessage={errorState.toString()} />
            <MemberCard member={sampleMember} />
          </View>
        )}
      </Flex>
      <Button
        variation="primary"
        colorTheme="overlay"
        loadingText=""
        onClick={handleLogout}
      >
        Sign out
      </Button>
    </View>
  );
};

export default MemberList;
