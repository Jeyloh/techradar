import React from 'react';
import styled from 'styled-components';
import { QUADRANTS } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTech, updateTech, addTech } from '../redux/actions/radar.action';

const TechForm = ({ existingData, deleteButton }) => {
  const dispatch = useDispatch();
  const { currentRadarList } = useSelector((state) => state.radar);
  const { isAdmin } = useSelector((state) => state.user.currentUser);

  const _deleteButton = deleteButton || dispatch(deleteTech);

  const [techForm, setTechForm] = React.useState({
    id: existingData ? existingData.id : null,
    confirmed: false,
    name: existingData ? existingData.name : '',
    url: existingData ? existingData.url : '',
    description: existingData ? existingData.description : '',
    quadrant: 'techniques',
    ring: 'adopt',
    moved: 'same',
    radarId: currentRadarList.length ? currentRadarList[0].id : '',
  });

  const [enableSubmit, toggleEnableSubmit] = React.useState(false);

  React.useEffect(() => {
    const enable = !!techForm.name.length;
    toggleEnableSubmit(enable, techForm);
  }, [toggleEnableSubmit, techForm]);

  React.useEffect(() => {
    if (existingData) {
      delete existingData.radar;
      delete existingData.__typename;
      setTechForm(existingData);
    }
  }, [existingData]);

  const handleChange = (e) => {
    setTechForm({ ...techForm, [e.target.name]: e.target.value });
  };

  const handleButtonClick = (e, btnVal) => {
    setTechForm({ ...techForm, [btnVal]: e.target.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      (currentRadarList && !currentRadarList.length) ||
      (existingData && existingData.techRadarId)
    ) {
      return alert('Before submitting a technology, specify a Radar to submit to.');
    }

    let radarId = techForm.radarId;
    if (!radarId.length) radarId = currentRadarList[0].id;

    const currentTechForm = {
      ...techForm,
      techRadarId: radarId,
      radarId: radarId,
    };

    if (existingData) {
      dispatch(updateTech(currentTechForm));
    } else {
      dispatch(addTech(currentTechForm));
    }
  };

  return (
    <AddTechForm onSubmit={(e) => handleSubmit(e)}>
      <h1>
        {existingData ? 'Update Technology' : `Add Technology ${!isAdmin ? 'for review' : ''}`}
      </h1>
      <TechFormInput xstart={1} xend={5} yStart={1} yEnd={1}>
        <input
          required
          disabled={existingData}
          type="text"
          placeholder="name *"
          style={{ fontWeight: 700 }}
          name="name"
          defaultValue={techForm.name}
          onChange={(e) => handleChange(e)}
        />
      </TechFormInput>

      <TechFormInput xstart={5} xend={9} yStart={1} yEnd={1}>
        <input
          type="url"
          placeholder="url"
          name="url"
          defaultValue={techForm.url}
          onChange={(e) => handleChange(e)}
        />
      </TechFormInput>

      <TechFormInput xstart={1} xend={5} yStart={2} yEnd={2}>
        <textarea
          defaultValue={techForm.description}
          placeholder="description"
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </TechFormInput>

      <TechFormInput xstart={5} xend={9} yStart={2} yEnd={2}>
        <h5>Changes</h5>
        <ButtonSelector>
          <button
            onClick={(e) => handleButtonClick(e, 'moved')}
            name="same"
            type="button"
            className={techForm.moved === 'same' ? 'current' : ''}
            value="same">
            ● No change
          </button>
          <button
            onClick={(e) => handleButtonClick(e, 'moved')}
            name="up"
            type="button"
            className={techForm.moved === 'up' ? 'current' : ''}
            value="up">
            ▲ moved up
          </button>
          <button
            onClick={(e) => handleButtonClick(e, 'moved')}
            name="down"
            type="button"
            className={techForm.moved === 'down' ? 'current' : ''}
            value="down">
            ▼ moved down
          </button>
        </ButtonSelector>
      </TechFormInput>

      <TechFormInput xstart={1} xend={5} yStart={3} yEnd={3}>
        <h5>Quadrant</h5>
        <ButtonSelector>
          <ColoredButton
            onClick={(e) => handleButtonClick(e, 'quadrant')}
            name="techniques"
            type="button"
            color={QUADRANTS[0]['color']}
            className={techForm.quadrant === 'techniques' ? 'current' : ''}
            value={'techniques'}>
            {QUADRANTS[0]['name']}
          </ColoredButton>
          <ColoredButton
            onClick={(e) => handleButtonClick(e, 'quadrant')}
            name="tools"
            type="button"
            color={QUADRANTS[1]['color']}
            className={techForm.quadrant === 'tools' ? 'current' : ''}
            value="tools">
            {QUADRANTS[1]['name']}
          </ColoredButton>
          <ColoredButton
            onClick={(e) => handleButtonClick(e, 'quadrant')}
            name="platforms"
            type="button"
            color={QUADRANTS[2]['color']}
            className={techForm.quadrant === 'platforms' ? 'current' : ''}
            value="platforms">
            {QUADRANTS[2]['name']}
          </ColoredButton>
          <ColoredButton
            onClick={(e) => handleButtonClick(e, 'quadrant')}
            name="languages"
            type="button"
            color={QUADRANTS[3]['color']}
            className={techForm.quadrant === 'languages' ? 'current' : ''}
            value="languages">
            {QUADRANTS[3]['name']}
          </ColoredButton>
        </ButtonSelector>
      </TechFormInput>

      <TechFormInput xstart={5} xend={9} yStart={3} yEnd={3}>
        <h5>Ring</h5>
        <ButtonSelector>
          <button
            type="button"
            onClick={(e) => handleButtonClick(e, 'ring')}
            name="adopt"
            className={techForm.ring === 'adopt' ? 'current' : ''}
            value="adopt">
            Adopt
          </button>
          <button
            type="button"
            onClick={(e) => handleButtonClick(e, 'ring')}
            name="trial"
            className={techForm.ring === 'trial' ? 'current' : ''}
            value="trial">
            Trial
          </button>
          <button
            type="button"
            onClick={(e) => handleButtonClick(e, 'ring')}
            name="assess"
            className={techForm.ring === 'assess' ? 'current' : ''}
            value="assess">
            Assess
          </button>
          <button
            type="button"
            onClick={(e) => handleButtonClick(e, 'ring')}
            name="hold"
            className={techForm.ring === 'hold' ? 'current' : ''}
            value="hold">
            Hold
          </button>
        </ButtonSelector>
      </TechFormInput>

      <TechFormInput xstart={1} xend={5} yStart={4} yEnd={4}>
        {existingData ? (
          <h5>Radar: {existingData.radarId}</h5>
        ) : !!currentRadarList.length ? (
          <>
            <h5>Select Radar</h5>
            <select name="radarId" onChange={(e) => handleChange(e)}>
              {currentRadarList.map((radar) => (
                <option key={radar.id} value={radar.id}>
                  {radar.id}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <h5>Specify radar</h5>
            <p>Select a radar from the list</p>
          </>
        )}
      </TechFormInput>

      <TechFormInput xstart={5} xend={9} yStart={4} yEnd={4}>
        {isAdmin && existingData && existingData.id && (
          <RemoveButton onClick={() => _deleteButton(existingData)} type="button">
            Remove
          </RemoveButton>
        )}
        <SubmitButton _disabled={!enableSubmit} type="submit">
          {existingData ? 'Update' : 'Submit'}
        </SubmitButton>
      </TechFormInput>
    </AddTechForm>
  );
};

export default TechForm;

const AddTechForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    min-width: unset;
  }
`;
export const ButtonSelector = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0;

  button {
    border-radius: 5px;
    padding: 8px;
    background: white;
    color: black;
    border: none;
    margin: 3px;
    cursor: pointer;
    outline: none;
  }

  button.current {
    background: ${(props) => props.theme.default.primaryColor};
    color: white;
    box-shadow: 0 0 0 3px white;
  }
`;

const ColoredButton = styled.button`
  border-radius: 5px;
  padding: 8px;
  background: ${(props) => props.color}!important;
  color: white !important;
  border: none;
  cursor: pointer;
`;

const TechFormInput = styled.div`
  width: 100%;

  button,
  select {
    padding: 12px 6px;
    width: 100%;
    margin-bottom: 10px;
  }
  input,
  textarea {
    width: 100%;
    padding: 12px 6px;
    margin: 2px 0;
    border: 1px solid ${(props) => props.theme.default.lightColor};
  }

  b {
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    input,
    button,
    textarea {
      padding: 10px;
      min-height: 20px;
      margin: 5px;
    }
    select {
      padding: 10px;
      min-height: 20px;
      margin: 5px;
    }
  }
`;

export const SubmitButton = styled.button`
  background-color: ${(props) =>
    props._disabled ? props.theme.default.grayColor : props.theme.default.primaryColor};
  color: ${(props) =>
    props._disabled ? props.theme.default.fontColor : props.theme.default.lightColor};
  padding: 12px;
  border: 1px solid ${(props) => props.theme.default.lightColor};

  :hover {
    background: ${(props) =>
      props._disabled ? props.theme.default.grayColor : props.theme.default.secondaryColor};
  }

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const RemoveButton = styled.button`
  background: ${(props) => props.theme.default.negativeColor};
  border: 1px solid ${(props) => props.theme.default.lightColor};
  color: ${(props) => props.theme.default.lightColor};
  padding: 12px;
  text-decoration: underline;
  border: none;
  margin: 10px 0;

  :hover {
    font-weight: bold;
  }
`;
