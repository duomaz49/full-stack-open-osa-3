const NotificationMessage = (props) => {
  const { message } = props;

  if (!message?.message) {
    return null;
  }
  return (
    <div style={message.isSuccess ? success : error}>{message.message}</div>
  );
};

export default NotificationMessage;

const error = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const success = {
  color: "green",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};
