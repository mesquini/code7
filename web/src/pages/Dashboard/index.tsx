import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { FiPower } from 'react-icons/fi';
import { FaSistrix } from 'react-icons/fa';
import { Modal, FormLabel, FormControl  } from 'react-bootstrap'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { ClapSpinner } from 'react-spinners-kit';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Buttons,
  Label,
  ModalButtons,
  Empty,
  Loading,
  Dividends,
} from './styles';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface IUser {
  id: number;
  name: string;
  username: string;
}

interface IDividend {
  id: string;
  user_id: number;
  name: string;
  price: string;
  reason: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [q, setQ] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dividends, setDividends] = useState<IDividend[]>([] as IDividend[]);
  const [selectedDividend, setSelectedDividend] = useState<IDividend>({} as IDividend);
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [userSelected, setUserSelect] = useState<IUser>({} as IUser);

  const formRef = useRef<FormHandles>(null);

  const { signOut, user } = useAuth();
  const { addToast } = useToast();

  const handleGetDividends = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get<IDividend[]>('/dividends');

      setDividends(response.data);

    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao buscar os Devedores.',
      });
    } finally {
      setLoading(false);
    }
  },[addToast]);

  const handleGetUsers = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok)
        addToast({
          type: 'error',
          title: 'Erro ao carregar os usuários',
          description: 'Não foi possivel buscar os usuários da API',
        });

      const users = await response.json() as IUser[];

      setUsers(users);
    } catch (err) {
      addToast({
          type: 'error',
          title: 'Erro ao carregar os usuários',
          description: 'Não foi possivel buscar os usuários da API',
      });
    }
  },[addToast]);

  useEffect(() => {
    handleGetUsers();
    handleGetDividends();
  },[handleGetDividends, handleGetUsers]);

  const filteredDividends = useMemo(
    () =>
      q
        ? dividends.filter(
            d => d.name.toLowerCase().indexOf(q.toLowerCase()) > -1
          )
        : dividends,
    [q, dividends]
  );

  const handleOnChangeSelect = useCallback((user_id: number) => {
    setUserSelect(users.find(user => user.id === user_id) as IUser);
  },[users])

  const handleCancelModal = useCallback(() => {
    setUserSelect({} as IUser);
    setSelectedDividend({} as IDividend);
    setShow(false);
  },[])

  const handleEditDividend = useCallback((dividend: IDividend) => {
    setSelectedDividend(dividend);
    setShow(true);
  },[])

  const handleDeleteDivident = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete(`/dividends/${selectedDividend.id}`);

      setDividends(state => state.filter(d => d.id !== selectedDividend.id));

      addToast({
        type: 'success',
        title: 'Devedor deletado com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar Devedor.',
      });
    } finally {
      handleCancelModal();
      setLoading(false);
    }
  },[addToast, handleCancelModal, selectedDividend.id])

  const handleSubmit = useCallback(async (data) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        reason: Yup.string()
        .required('Motivo é obrigatorio'),
        price: Yup.string().required('Preço é obrigatoria'),
        date: Yup.string().required('Date é obrigatoria'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if(!userSelected.id && !data.id) return;

      if(data.id){

        await api.put<IDividend>('/dividends', {
          ...data,
        });

        setDividends(state =>
           state.map(d => {
            if(d.id === data.id) return data;
            else return d;
          })
        );

        addToast({
          type: 'success',
          title: 'Devedor alterado com sucesso!',
        });
      }
      else {
        const response = await api.post<IDividend>('/dividends', {
          ...data,
          user_id: userSelected.id,
          name: userSelected.name
        });

        setDividends(state => [...state, response.data]);

        addToast({
          type: 'success',
          title: 'Devedor cadastrado com sucesso!',
        });
      }

      handleCancelModal();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          return formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar Devedor',
          description: 'Ocorreu um erro ao cadastrar um Devedor, cheque as informações!',
        });
    } finally {
      setLoading(false);
    }
  },[userSelected.id, userSelected.name, handleCancelModal, addToast]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <img
              src={
                `https://ui-avatars.com/api/?name=${user.name}`
              }
              alt="Admin"
            />
            <div>
              <span>Bem-Vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <h2>Gerenciamento de Dívidas</h2>
        <Buttons>
          <Form onSubmit={() => {}}>
            <Input
              name="search"
              icon={FaSistrix}
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar Devedor"
            />
          </Form>
          <Button onClick={() => setShow(true)}>+ CADASTRAR</Button>
        </Buttons>
        {!loading ? (
          <div>
            {dividends.length ? (
              <div>
                {filteredDividends.length === 0 ? (
                  <Empty>
                    <strong>
                      Você não tem nenhum devedor com esse nome!
                    </strong>
                  </Empty>
                ) : (
                  <Dividends>
                    {filteredDividends.map(dividend => (
                      <button key={dividend.id} onClick={() => handleEditDividend(dividend)}>
                        <h4>{dividend.name}</h4>
                        <p>{dividend.reason}</p>
                        <div>
                          <h5>{dividend.date}</h5>
                          <strong>R$ {dividend.price}</strong>
                        </div>
                      </button>
                    ))}
                  </Dividends>
                )}
              </div>
            ) : (
              <Empty>
                <strong>Você não possuí nenhum devedor cadastrado!</strong>
              </Empty>
            )}
          </div>
        ) : (
          <Loading>
            <ClapSpinner
              loading={loading}
              size={45}
              frontColor="#135B7B"
              backColor="#686769"
            />
          </Loading>
        )}

      </Content>

      <Modal show={show} onHide={handleCancelModal}>
        <Modal.Header>
          <Modal.Title>Cadastro de Devedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} onSubmit={handleSubmit} initialData={selectedDividend}>
            <Label>
              <FormLabel>Cliente</FormLabel>
              {selectedDividend.id ? (
                <div>
                  <Input name="id" readOnly containerStyle={{display: 'none'}} value={selectedDividend.id} />
                  <Input name="user_id" readOnly containerStyle={{display: 'none'}} value={selectedDividend.user_id} />
                  <Input name="name" containerStyle={{opacity: 0.5}} readOnly disabled />
                </div>
              ) : (
                <FormControl
                  as="select"
                  custom
                  onChange={value => handleOnChangeSelect(Number(value.target.value))}>
                  <option value="0">Selecione um cliente...</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </FormControl>
              )}
            </Label>

            <Label>
              <FormLabel>Motivo</FormLabel>
              <Input name="reason" maxLength={80} placeholder="Ex: divida cartão de crédito" />
            </Label>

            <Label>
              <FormLabel>Valor</FormLabel>
              <Input
                name="price"
                prefix="R$"
                mask="currency"
                placeholder="Ex: 500,00"
              />
            </Label>

            <Label>
              <FormLabel>Data</FormLabel>
              <Input name="date" mask="date" maxLength={10} placeholder="Ex: 02/10/2020" />
            </Label>

            <ModalButtons>
              <Modal.Footer>
                  {selectedDividend.id ? (
                    <Button style={{backgroundColor: '#c1c1c1'}} onClick={handleDeleteDivident}>
                      Excluir
                    </Button>
                  ) : (
                    <Button style={{backgroundColor: '#c1c1c1'}} onClick={handleCancelModal}>
                      Cancelar
                    </Button>
                  )}
                  {selectedDividend.id ? (
                    <Button type="submit">
                      Alterar
                    </Button>
                  ) : (
                    <Button type="submit">
                      Salvar
                    </Button>
                  )}
              </Modal.Footer>
            </ModalButtons>
          </Form>

        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
