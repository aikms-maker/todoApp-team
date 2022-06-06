import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteTodo, editTodo } from "../../api/api";
import { TextContext } from "../../providers/textProvider";
import { SIndex, SInputArea, STitle, SWrapper } from "../create/create";
import { SDeleteButton, SPrimaryButton } from "../list/list";
import { formatDate } from "../parts/formatDate";
import { prioritySelect } from "../parts/prioritySelect";
import { TodoInputArea } from "../parts/TodoInputArea";
import { useInput } from "../parts/useInput";

export const Update = () => {
  const history = useHistory();
  const location = useLocation();

  const text = useInput();
  const contentText = useInput();

  const { id } = useParams();

  const { today, startDate, setStartDate } = useContext(TextContext);

  const onClickUpdate = async () => {
    console.log(text);
    if (text.text === "" || contentText.text === "") return;
    await editTodo(
      text.text,
      contentText.text,
      prioritySelect(startDate, today),
      formatDate(startDate),
      id
    );
    history.goBack();
  };

  const onClickDelete = async () => {
    await deleteTodo(id);
    history.goBack();
  };

  useEffect(() => {
    setStartDate(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWrapper>
      <h1>Todo更新</h1>
      <SInputArea>
        <SIndex>
          <STitle>{id} Update</STitle>
        </SIndex>
        <TodoInputArea
          titlePlaceholder={`${location.state.title}`}
          titleText={text.text}
          titleOnchange={text.onTextChange}
          contentPlaceholder={`${location.state.content}`}
          contentText={contentText.text}
          contentOnTextChange={contentText.onTextChange}
        />
        <SBackButton onClick={() => history.goBack()}>戻る</SBackButton>
        <SDeleteButton onClick={() => onClickDelete()}>削除</SDeleteButton>
        <SUpdateButton onClick={() => onClickUpdate()}>更新</SUpdateButton>
      </SInputArea>
    </SWrapper>
  );
};

const SBackButton = styled(SPrimaryButton)`
  margin-right: 70%;
`;

const SUpdateButton = styled(SPrimaryButton)`
  color: #ffffff;
  background-color: #37a34a;
  &:hover {
    cursor: pointer;
    background-color: #89c997;
  }
`;
