import NoStudentImg from 'assets/images/student.svg';

interface IProps {
  message: string;
}

export const NoStudent = ({ message }: IProps) => {
  return (
    <div className="no-student">
      <img
        className="no-student-image"
        src={NoStudentImg}
        alt="No student in class"
      />
      <p>{message}</p>
    </div>
  );
};
