import { useState, useEffect } from "react";
import { Member } from "../types/Member";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Text, View } from "@aws-amplify/ui-react";

const MemberList = () => {
  // useStateでユーザー情報を保存するための状態を作成
  const [MemberList, setMemberList] = useState([]);
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
            return (
              <View padding="0.7rem">
                <Card variation="outlined">
                  <View padding="0.5rem" width="240px">
                    <Text>{m.name}</Text>
                    <Text>{m.email}</Text>
                  </View>
                </Card>
              </View>
            );
          })}
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
