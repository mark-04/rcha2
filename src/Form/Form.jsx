import React, { Component } from "react";
import styles from "./Form.module.css";

const initState = () => ({
  inputEnabled: true,
  inputFields: {
    first_name: {
      value: "",
    },
    second_name: {
      value: "",
    },
    date_of_birth: {
      value: "",
    },
    phone_number: {
      value: "",
    },
    website: {
      value: "",
    },
    about_self: {
      value: "",
      charCount: 0,
    },
    tech_stack: {
      value: "",
      charCount: 0,
    },
    last_project: {
      value: "",
      charCount: 0,
    },
  },
});

function decorateInput({ id, ...rest }) {
  const inputState = this.state.inputFields[id];
  let decorated = {
    id,
    ...rest,
    renderProps: {
      value: inputState.value,
      onChange: this.handleChange,
      disabled: !this.state.inputEnabled,
    },
  };

  if (inputState.error) {
    decorated = {
      ...decorated,
      error: true,
      errorMessage: inputState.errorMessage,
    };
  }

  return decorated;
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = initState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.decorateInput = decorateInput.bind(this);
  }

  handleChange(event) {
    const { id: inputName, value: newInputValue } = event.target;

    if (inputName === "first_name") {
      this.setState((state, _) => setFirstName(newInputValue, state));

      return;
    }

    if (inputName === "second_name") {
      this.setState((state, _) => setSecondName(newInputValue, state));

      return;
    }

    if (inputName === "date_of_birth") {
      this.setState((state, _) => setDateOfBirth(newInputValue, state));

      return;
    }

    if (inputName === "phone_number") {
      this.setState((state, _) => setPhoneNumber(newInputValue, state));

      return;
    }

    if (inputName === "website") {
      this.setState((state, _) => setWebsite(newInputValue, state));

      return;
    }

    if (inputName === "about_self") {
      this.setState((state, _) => setAboutSelf(newInputValue, state));

      return;
    }

    if (inputName === "tech_stack") {
      this.setState((state, _) => setTechStack(newInputValue, state));

      return;
    }

    if (inputName === "last_project") {
      this.setState((state, _) => setLastProject(newInputValue, state));

      return;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState((state, _) => {
      const { allValid, errorInfo = {} } = validateInputFields(state);

      if (allValid) {
        return enableInput(state, false);
      } else {
        return showErrorMessages(errorInfo, state);
      }
    });
  }

  handleCancel(event) {
    event.preventDefault();

    this.setState(initState());
  }

  render() {
    const firstNameProps = this.decorateInput({
      id: "first_name",
    });

    const secondNameProps = this.decorateInput({
      id: "second_name",
    });

    const dateOfBirthProps = this.decorateInput({
      id: "date_of_birth",
    });

    const phoneNumberProps = this.decorateInput({
      id: "phone_number",
    });

    const websiteProps = this.decorateInput({
      id: "website",
    });

    const aboutSelfProps = this.decorateInput({
      id: "about_self",
      charCount: this.state.inputFields.about_self.charCount,
    });

    const techStackProps = this.decorateInput({
      id: "tech_stack",
      charCount: this.state.inputFields.tech_stack.charCount,
    });

    const lastProjectProps = this.decorateInput({
      id: "last_project",
      charCount: this.state.inputFields.last_project.charCount,
    });

    return (
      <div className={styles.form_container}>
        <h1 className={styles.form_heading}>Создание Анкеты</h1>
        <form className={styles.form_body}>
          <FirstName {...firstNameProps} />
          <SecondName {...secondNameProps} />
          <DateOfBirth {...dateOfBirthProps} />
          <PhoneNumber {...phoneNumberProps} />
          <Website {...websiteProps} />
          <AboutSelf {...aboutSelfProps} />
          <TechStack {...techStackProps} />
          <LastProject {...lastProjectProps} />
          <div className={styles.actions}>
            <button
              className={styles.save_button}
              onClick={this.handleSubmit}
              disabled={!this.state.inputEnabled}
            >
              Сохранить
            </button>
            <button
              className={styles.calcel_button}
              onClick={this.handleCancel}
              disabled={this.state.inputEnabled}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function setFirstName(name, state) {
  const newState = { ...state };

  if (newState.inputFields.first_name.error) {
    delete newState.inputFields.first_name.error;
    delete newState.inputFields.first_name.errorMessage;
  }

  newState.inputFields.first_name.value = name;

  return newState;
}

function setSecondName(name, state) {
  const newState = { ...state };

  if (newState.inputFields.second_name.error) {
    delete newState.inputFields.second_name.error;
    delete newState.inputFields.second_name.errorMessage;
  }

  newState.inputFields.second_name.value = name;

  return newState;
}

function setDateOfBirth(date, state) {
  const newState = { ...state };

  if (newState.inputFields.date_of_birth.error) {
    delete newState.inputFields.date_of_birth.error;
    delete newState.inputFields.date_of_birth.errorMessage;
  }

  newState.inputFields.date_of_birth.value = date;

  return newState;
}

function setPhoneNumber(number, state) {
  const newState = { ...state };

  if (newState.inputFields.phone_number.error) {
    delete newState.inputFields.phone_number.error;
    delete newState.inputFields.phone_number.errorMessage;
  }

  newState.inputFields.phone_number.value = formatPhoneNumber(number);

  return newState;
}

function formatPhoneNumber(input) {
  let normalized = "";

  for (let char of input) {
    if (/\d/.test(char)) {
      normalized += char;
    }
  }

  if (normalized === "") {
    return "";
  }

  const chunks = splitInChunks([1, 4, 2, 2], normalized);
  const formatted = chunks.join("-");

  return formatted;
}

function splitInChunks(chunks, str, result = []) {
  if (chunks.length === 0 || str === "") {
    return result;
  }

  const firstChunk = chunks[0];

  if (firstChunk > str.length) {
    return [...result, str];
  }

  const restChunks = chunks.slice(1);
  const restString = str.slice(firstChunk);
  const stringChunk = str.slice(0, firstChunk);

  return splitInChunks(restChunks, restString, [...result, stringChunk]);
}

function setWebsite(website, state) {
  const newState = { ...state };

  if (newState.inputFields.website.error) {
    delete newState.inputFields.website.error;
    delete newState.inputFields.website.errorMessage;
  }

  newState.inputFields.website.value = website;

  return newState;
}

function setAboutSelf(aboutSelf, state) {
  const newState = { ...state };

  if (newState.inputFields.about_self.error) {
    delete newState.inputFields.about_self.error;
    delete newState.inputFields.about_self.errorMessage;
  }

  newState.inputFields.about_self.value = aboutSelf;
  newState.inputFields.about_self.charCount = aboutSelf.length;

  return newState;
}

function setTechStack(teckStack, state) {
  const newState = { ...state };

  if (newState.inputFields.tech_stack.error) {
    delete newState.inputFields.tech_stack.error;
    delete newState.inputFields.tech_stack.errorMessage;
  }

  newState.inputFields.tech_stack.value = teckStack;
  newState.inputFields.tech_stack.charCount = teckStack.length;

  return newState;
}

function setLastProject(lastProject, state) {
  const newState = { ...state };

  if (newState.inputFields.last_project.error) {
    delete newState.inputFields.last_project.error;
    delete newState.inputFields.last_project.errorMessage;
  }

  newState.inputFields.last_project.value = lastProject;
  newState.inputFields.last_project.charCount = lastProject.length;

  return newState;
}

function validateInputFields({ inputFields }) {
  const inputEntries = Object.entries(inputFields);
  const validatedEntries = inputEntries.map(([fieldName, info]) => {
    return validateInputField(fieldName, info);
  });
  const allValid = validatedEntries.reduce(
    (acc, { valid }) => acc && valid,
    true
  );

  if (allValid) {
    return { allValid };
  } else {
    const erroneousInputs = validatedEntries
      .filter(({ valid }) => !valid)
      .reduce((res, { fieldName, errorMessage }) => {
        res[fieldName] = errorMessage;

        return res;
      }, {});

    return { allValid: false, errorInfo: erroneousInputs };
  }
}

function validateInputField(fieldName, { value }) {
  if (fieldName === "first_name" || fieldName === "second_name") {
    const name = value.trim();

    if (name.length === 0) {
      return {
        fieldName,
        valid: false,
        errorMessage: "Поле не должно быть пустым",
      };
    }

    const isCapitalized = name[0] === name[0].toUpperCase();

    if (isCapitalized) {
      return {
        fieldName,
        valid: true,
      };
    } else {
      return {
        fieldName,
        valid: false,
        errorMessage: "Имя и фамилия должны начинаться с большой буквы",
      };
    }
  }

  if (fieldName === "date_of_birth") {
    if (value !== "") {
      return {
        fieldName,
        valid: true,
      };
    } else {
      return {
        fieldName,
        valid: false,
        errorMessage: "Поле не должно быть пустым",
      };
    }
  }

  if (fieldName === "phone_number") {
    if (value === "") {
      return {
        fieldName,
        valid: false,
        errorMessage: "Поле не должно быть пустым",
      };
    } else if (value.length < 12) {
      return {
        fieldName,
        valid: false,
        errorMessage: "Неправельный номер",
      };
    } else {
      return {
        fieldName,
        valid: true,
      };
    }
  }

  if (fieldName === "website") {
    if (value === "") {
      return {
        fieldName,
        valid: false,
        errorMessage: "Поле не должно быть пустым",
      };
    } else if (invalidWebsite(value)) {
      return {
        fieldName,
        valid: false,
        errorMessage: "Неправельный сайт",
      };
    } else {
      return {
        fieldName,
        valid: true,
      };
    }
  }

  if (
    fieldName === "about_self" ||
    fieldName === "tech_stack" ||
    fieldName === "last_project"
  ) {
    if (value === "") {
      return {
        fieldName,
        valid: false,
        errorMessage: "Поле не должно быть пустым",
      };
    } else if (value.length > 600) {
      return {
        fieldName,
        valid: false,
        errorMessage: "Превышен лимит символов в поле",
      };
    } else {
      return {
        fieldName,
        valid: true,
      };
    }
  }
}

function invalidWebsite(website) {
  return !/^https:\/\//.test(website);
}

function enableInput(state, bool) {
  return { ...state, inputEnabled: bool };
}

function showErrorMessages(errorInfo, state) {
  const inputFieldsCopy = { ...state.inputFields };

  for (let erroneous in errorInfo) {
    inputFieldsCopy[erroneous].error = true;
    inputFieldsCopy[erroneous].errorMessage = errorInfo[erroneous];
  }

  return { ...state, inputFields: inputFieldsCopy };
}

class FirstName extends Component {
  render() {
    const { renderProps } = this.props;
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        Имя
        <input
          {...renderProps}
          id={this.props.id}
          type="text"
          placeholder="Джон"
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class SecondName extends Component {
  render() {
    const { renderProps } = this.props;
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        Фамилия
        <input
          {...renderProps}
          id={this.props.id}
          type="text"
          placeholder="Смит"
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class DateOfBirth extends Component {
  render() {
    const { renderProps } = this.props;
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        Дата рождения
        <input
          {...renderProps}
          type="date"
          id={this.props.id}
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class PhoneNumber extends Component {
  render() {
    const { renderProps } = this.props;
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        Номер телефона
        <input
          {...renderProps}
          type="text"
          id={this.props.id}
          placeholder="_-____-__-__"
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class Website extends Component {
  render() {
    const { renderProps } = this.props;
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        Сайт
        <input
          {...renderProps}
          type="text"
          id={this.props.id}
          placeholder="https://..."
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class AboutSelf extends Component {
  render() {
    const { renderProps } = this.props;
    const counterMessage =
      this.props.charCount <= 600
        ? `Осталось ${this.props.charCount}/600 символов`
        : "Превышен лимит символов в поле";
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        О себе
        <span className={styles.char_counter}>{counterMessage}</span>
        <textarea
          {...renderProps}
          id={this.props.id}
          cols="30"
          rows="7"
          placeholder="Я начал свою карьеру в IT с..."
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class TechStack extends Component {
  render() {
    const { renderProps } = this.props;
    const counterMessage =
      this.props.charCount <= 600
        ? `Осталось ${this.props.charCount}/600 символов`
        : "Превышен лимит символов в поле";
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        О себе
        <span className={styles.char_counter}>{counterMessage}</span>
        <textarea
          {...renderProps}
          id={this.props.id}
          cols="30"
          rows="7"
          placeholder="К примеру, React + Node.js"
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

class LastProject extends Component {
  render() {
    const { renderProps } = this.props;
    const counterMessage =
      this.props.charCount <= 600
        ? `Осталось ${this.props.charCount}/600 символов`
        : "Превышен лимит символов в поле";
    return (
      <label htmlFor={this.props.id} className={styles.form_label}>
        О себе
        <span className={styles.char_counter}>{counterMessage}</span>
        <textarea
          {...renderProps}
          id={this.props.id}
          cols="30"
          rows="7"
          placeholder="Компания, задачи, успехи, ошибки и тд..."
          className={this.props.error ? styles.red_borders : ""}
        />
        {this.props.error ? (
          <p className={styles.input_error_message}>
            {this.props.errorMessage}
          </p>
        ) : null}
      </label>
    );
  }
}

export default Form;
