import { useState, useEffect } from 'react';
import styles from './form.module.css';
import ListMembers from './ListMembers/ListMembers';
import Preloader from '../../Shared/Preloader/Preloader';
import Input from '../../Shared/Input';
import Textarea from '../../Shared/Textarea';
import ButtonText from '../../Shared/Buttons/ButtonText';
import AlertModal from '../../Shared/ErrorSuccessModal';
import { getProjectById, updateProject } from '../../../redux/projects/thunks';
import { useDispatch, useSelector } from 'react-redux';

const ProjectForm = ({ edit, itemId, functionValue, closeModalForm }) => {
  const [edited, setEdited] = useState(false);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projects.isLoading);
  const project = useSelector((state) => state.projects.project);
  const [userInput, setUserInput] = useState({
    name: '',
    startDate: '',
    endDate: '',
    clientName: '',
    active: true,
    description: ''
  });

  useEffect(() => {
    dispatch(
      getProjectById(itemId, (userInput) =>
        setUserInput({
          name: userInput.name,
          startDate: userInput.startDate,
          endDate: userInput.endDate,
          clientName: userInput.clientName,
          active: userInput.active,
          description: userInput.description
        })
      )
    );
  }, []);

  const handleOnSubmit = () => {
    dispatch(updateProject(itemId, userInput, (alertMessage) => setAlertMessage(alertMessage)));
    setEdited(false);
    openAlertModal();
  };

  const onSubmit = () => {
    edited
      ? handleOnSubmit()
      : (setEdited(false),
        setAlertMessage({ error: true, message: 'No input changed. The project stayed the same' }),
        openAlertModal());
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
    setEdited(true);
  };

  const onChangeActive = (e) => {
    setUserInput({ ...userInput, active: e.target.checked });
    setEdited(true);
  };

  const handleOnClick = () => {
    edited
      ? confirm('All unsaved changes will be lost. Are you sure you want to continue?')
        ? closeModalForm()
        : null
      : closeModalForm();
  };

  const closeAlertModal = () => {
    setShowErrorSuccessModal(false);
  };

  const openAlertModal = () => {
    setShowErrorSuccessModal(true);
  };

  return isLoading ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
    <>
      <form className={styles.container}>
        <div className={!edit ? styles.maincontainer.add : styles.maincontainer}>
          <div className={styles.divcontainer}>
            <Input
              label="Project Name"
              type="text"
              name="name"
              placeholder="Insert project name"
              value={userInput.name}
              onChange={onChange}
              required={true}
            />
            <Input
              label="Client"
              type="text"
              name="clientName"
              placeholder="Insert client name"
              value={userInput.clientName}
              onChange={onChange}
              required={true}
            />
            <Input
              label="Active"
              name="active"
              type="checkbox"
              checked={userInput.active}
              onChange={onChangeActive}
            />
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={!edit ? userInput.startDate : userInput.startDate.slice(0, 10)}
              onChange={onChange}
              required={true}
            />
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={!edit ? userInput.endDate : userInput.endDate.slice(0, 10)}
              onChange={onChange}
              required={true}
            />
          </div>
          <div className={styles.larger}>
            <Textarea
              label="Description"
              name="description"
              value={userInput.description}
              placeholder="Add a description of the project"
              onChange={onChange}
              required={true}
            />
            <div>
              <ListMembers
                project={project}
                onAdd={!edit}
                edited={edited}
                functionValue={functionValue}
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        <ButtonText
          clickAction={() => {
            onSubmit();
          }}
          label="Submit"
        ></ButtonText>
        <ButtonText
          clickAction={() => {
            handleOnClick();
          }}
          label="Close"
        ></ButtonText>
        <AlertModal
          show={showErrorSuccessModal}
          closeModal={closeAlertModal}
          closeModalForm={closeModalForm}
          successResponse={alertMessage}
        />
      </div>
    </>
  );
};
export default ProjectForm;
