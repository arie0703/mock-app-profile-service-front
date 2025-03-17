import { Member } from "../types/Member";
import { Card, Text, View } from "@aws-amplify/ui-react";

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <View padding="0.7rem">
      <Card variation="outlined">
        <View padding="0.5rem" width="240px">
          <Text>{member.name}</Text>
          <Text>{member.email}</Text>
        </View>
      </Card>
    </View>
  );
};

export default MemberCard;
