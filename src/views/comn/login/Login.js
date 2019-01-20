import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';

import styles from './Login.scss';
const cx = classNames.bind(styles);

const Login = ({
  id,
  password,
  error,
  onChangeInput,
  onKeyPress,
  onLogin,
  intl,
}) => (
  <div className={cx(['app', 'flex-row', 'align-items-center'])}>
    <Helmet>
      <meta charsSet="utf-8" />
      <title>{intl.formatMessage({ id: 'comn.login' })}</title>
    </Helmet>
    <Container>
      <Row className={cx('justify-content-center')}>
        <Col md="8">
          <CardGroup>
            <Card className={cx('p-4')}>
              <CardBody>
                <Form>
                  <h1>
                    <FormattedMessage id="comn.app_nm" />
                  </h1>
                  <p className={cx('text-muted')}>
                    아이디/비밀번호를 입력하세요.
                  </p>
                  <InputGroup className={cx('mb-3')}>
                    <InputGroupAddon addonType={cx('prepend')}>
                      <InputGroupText>
                        <i className={cx('icon-user')} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      autoFocus
                      type="text"
                      name="id"
                      vaule={id}
                      onChange={onChangeInput}
                      placeholder={intl.formatMessage({ id: 'comn.id' })}
                      autoComplete="username"
                    />
                  </InputGroup>
                  <InputGroup className={cx('mb-4')}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className={cx('icon-lock')} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChangeInput}
                      placeholder={intl.formatMessage({ id: 'comn.pwd' })}
                      autoComplete="current-password"
                      onKeyPress={onKeyPress}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="6">
                      <Button
                        color="primary"
                        className={cx('px-4')}
                        onClick={onLogin}
                      >
                        <FormattedMessage id="comn.login" />
                      </Button>
                    </Col>
                  </Row>
                  {/* {error && (
                    <Row>
                      <Col xs="6">
                        <p className={cx('text-muted')}>로그인 실패</p>
                      </Col>
                    </Row>
                  )} */}
                </Form>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  </div>
);

export default injectIntl(Login);
