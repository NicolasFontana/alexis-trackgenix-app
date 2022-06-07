const Button = ({ clickAction, buttonText, className }) => {
  return (
    <button type="button" onClick={clickAction} className={className}>
      {buttonText}
    </button>
  );
};

export default Button;
