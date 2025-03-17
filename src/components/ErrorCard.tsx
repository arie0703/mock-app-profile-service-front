import { Card, Text, useTheme } from "@aws-amplify/ui-react";

interface ErrorCardProps {
  errorMessage: string;
}

const ErrorCard = ({ errorMessage }: ErrorCardProps) => {
  const { tokens } = useTheme();

  return (
    <Card backgroundColor={tokens.colors.background.error}>
      <Text>{errorMessage}</Text>
    </Card>
  );
};

export default ErrorCard;
