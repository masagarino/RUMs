import React from 'react'
import PropTypes from 'prop-types'
import {
	Container,
	Content,
	Header,
	Left,
	Right,
	Icon,
	Title,
	Text,
	Form,
	Item,
	Label,
	Input,
	Button,
	Body,
	CheckBox,
	ListItem,
	Thumbnail,
	View,
	Grid,
	Row,
	H1,
	Spinner
} from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Modal } from 'react-native'
import { translate } from '../i18n'
import Messages from '../components/Messages'
import Spacer from '../components/Spacer'
import defaultValues from '../constants/defaultValues'
import * as uiColor from '../constants/uiColor'

import * as rumsActions from '../actions/rumsActions';

function createStyleSheet(organizationColor) {
	return StyleSheet.create({
		opacity: {
			opacity: 0.8
		},
		backText: {
			top: -1,
			fontSize: 17,
			color: '#F9F9F9',
		},
		content: {
			backgroundColor: '#FFF'
		},
		header: {
			backgroundColor: uiColor.getSecondaryColor(organizationColor)
		},
		headerTitle: {
			color: '#FFF',
			fontSize: 18,
			alignSelf: 'center'
		},
		topTitle: {
			color: uiColor.getSecondaryColor(organizationColor),
			fontSize: 16,
			textAlign: 'center'
		},
		userInfoRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			alignSelf: 'flex-start',
			paddingTop: 3,
			paddingLeft: 11,
			paddingRight: 11,
			paddingBottom: 3,
		},
		userInfoFieldsView: {
			paddingLeft: 5,
			paddingRight: 5,
			width: '100%'
		},
		userInfoFieldInput: {
			paddingTop: 5,
			paddingBottom: 5,
			fontSize: 13,
			borderWidth: 1,
			borderColor: uiColor.getPrimaryColor(organizationColor)
		},
		userInfoFieldTitleView: {
			padding: 10,
			height: 40,
		},
		userInfoFieldTitle: {
			// height: 30,
			fontSize: 13,
			color: '#808080',
			flex: 1,
			width: 80,
			height: 40,
		},
		userInfoValueView: {
			flex: 5,
			paddingLeft: 15,
			height: 30
		},
		button: {
			backgroundColor: '#7E888D'
		},
		validateButton: {
			backgroundColor: uiColor.getPrimaryColor(organizationColor)
		},
		buttonText: {
			color: '#FFF',
			fontSize: 18
		},
		thumbnail: {
			alignSelf: 'center',
			height: 35,
			width: 35
		},
		input: {
			color: uiColor.getSecondaryColor(organizationColor)
		},
		note: {
			fontSize: 10,
			color: '#A1A1A1'
		},
		buttonStyle: {
			color: '#0076FF',
		},
		errorItem: {
			color: '#D9534F',
			paddingTop: 5,
			backgroundColor: '#FFF'
		}
	})
}


class InteractRumUpdateScreen extends React.Component {
	static defaultProps = {
		error: null
	}

	constructor(props) {
		super(props)
		this.state = {
			styles: createStyleSheet(props.organizationColor),
			person: {
				City: "",
				Company: "",
				DateCreated: "",
				Email: "",
				FirstName: "",
				Industry: "",
				JobTitle: "",
				LastName: "",
				LinkedInUrl: "",
				Phone: "",
				PreferredName: "",
				State: "",
			},
			RumID: "",
			saveButtonValidate: false,
			errorMessages: [],
			errorShow: false,
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange = (name, val) => {
		let { person } = this.state
		person[name] = val
		this.setState(
			{
				...this.state,
				person: person
			},
			() => {
				this.checkValidataion()
			}
		)
	}

	handleSave = () => {
		this.setState({
			showSuccessAlert: false,
			saveRequest: false
		})
		const { saveButtonValidate, person, RumID } = this.state
		// const Value = {RumID, person};
		if (saveButtonValidate) {
			this.props.rumsActions.rumsUpdateRequest(
				this.props.auth.access_token,
				this.props.auth.token_type,
				person,
				RumID
			)
		} else {
			this.setState({ errorShow: true })
		}
	}

	validateEmail = email => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	}

	validateNumber = number => {
		var re = /^[\d\.\-]+$/
		return re.test(number)
	}

	checkValidataion = () => {
		const {
			person
		} = this.state
		const locale = 'en'
		let result = [],
			validate = true
		if (person.FirstName == '') {
			result[0] = translate('Input first name', locale)
			validate = false
		}
		if (person.PreferredName == '') {
			result[1] = translate('Input preferred name', locale)
			validate = false
		}
		if (person.LastName == '') {
			result[2] = translate('Input last name', locale)
			validate = false
		}
		if (person.JobTitle == '') {
			result[3] = translate('Input job title', locale)
			validate = false
		}
		if (person.Company == '') {
			result[4] = translate('Input company', locale)
			validate = false
		}
		if (person.City == '') {
			result[5] = translate('Input city', locale)
			validate = false
		}
		if (person.State == '') {
			result[6] = translate('Input state', locale)
			validate = false
		}
		if (person.Industry == '') {
			result[7] = translate('Input industry', locale)
			validate = false
		}
		if (person.Email == '') {
			result[8] = translate('Input email address', locale)
			validate = false
		} else if (!this.validateEmail(person.Email)) {
			result[8] = translate('Input validate email', locale)
			validate = false
		}
		if (!this.validateNumber(person.Phone)) {
			result[9] = translate('Input the correct number', locale)
			validate = false
		}
		if (person.LinkedInUrl == '') {
			result[10] = translate('Input Linkedin Url', locale)
			validate = false
		}

		this.setState({
			errorMessages: result,
			saveButtonValidate: validate,
			errorShow: false
		})
		return validate
	}

	componentWillMount = () => {
		const { rums } = this.props;
		const { person } = this.state;

		var Data = {};
		var List = {};
		var RumID
		Object.getOwnPropertyNames(rums).forEach(
			function (val, idx, array) {
				rums[val].RumID !== undefined ? RumID = rums[val]["RumID"] : ''

				if (rums[val] === undefined || typeof rums[val] == "object") {
					Data = rums[val]["Person"];
				}
			}
		);
		Object.keys(Data).map((x, i) => (
			Data[x] !== null && typeof Data[x] == "string" ?
				List[x] = Data[x]
				: ''

		))
		this.setState({
			person: List,
			RumID
		})
	}
	componentDidMount = () => {
		this.checkValidataion()

	}

	componentWillUnmount() {
		this.isMounted = false
	}

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back())
	}

	render() {
		const locale = 'en'
		const {
			errorMessages,
			errorShow,
			styles,
			saveButtonValidate,
			person
		} = this.state
		return (
			<Container>
				<Header style={styles.header}>
					<Left style={{ flex: 2 }}>
						<Button transparent onPress={this.goBack}>
							<Text style={styles.backText}>{translate('Cancel', locale)}</Text>
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title style={styles.headerTitle}>
							{translate('UPDATE RUM', locale)}
						</Title>
					</Body>
					<Right style={{ flex: 2 }}>
						<Button transparent onPress={this.handleSave}>
							<Text style={styles.backText}>{translate('Save', locale)}</Text>
						</Button>
					</Right>

				</Header>
				<Content
					style={styles.content}
				>
					<View style={styles.userInfoFieldsView}>
						<Spacer size={20} />
						<Grid>
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('First Name', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('First Name', locale)}
										defaultValue={person.FirstName}
										onChangeText={v => this.handleChange('FirstName', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[0] && (
									<Messages message={errorMessages[0]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Preferred Name', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Preferred Name', locale)}
										defaultValue={person.PreferredName}
										onChangeText={v => this.handleChange('PreferredName', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[1] && (
									<Messages message={errorMessages[1]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Last Name', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Last Name', locale)}
										defaultValue={person.LastName}
										onChangeText={v => this.handleChange('LastName', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[2] && (
									<Messages message={errorMessages[2]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Job Title', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Job Title', locale)}
										defaultValue={person.JobTitle}
										onChangeText={v => this.handleChange('JobTitle', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[3] && (
									<Messages message={errorMessages[3]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Company', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Company', locale)}
										defaultValue={person.Company}
										onChangeText={v => this.handleChange('Company', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[4] && (
									<Messages message={errorMessages[4]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('City', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('City', locale)}
										defaultValue={person.City}
										onChangeText={v => this.handleChange('City', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[5] && (
									<Messages message={errorMessages[5]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('State', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('State', locale)}
										defaultValue={person.State}
										onChangeText={v => this.handleChange('State', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[6] && (
									<Messages message={errorMessages[6]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Industry', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Industry', locale)}
										defaultValue={person.Industry}
										onChangeText={v => this.handleChange('Industry', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[7] && (
									<Messages message={errorMessages[7]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Email', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Email', locale)}
										defaultValue={person.Email}
										onChangeText={v => this.handleChange('Email', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[8] && (
									<Messages message={errorMessages[8]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('Phone', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('Phone', locale)}
										defaultValue={person.Phone}
										onChangeText={v => this.handleChange('Phone', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[9] && (
									<Messages message={errorMessages[9]} />
								)}
							<Row style={styles.userInfoRow} size={0}>
								<View style={styles.userInfoFieldTitleView}>
									<Text style={styles.userInfoFieldTitle}>
										{translate('LinkedInUrl', locale)}
									</Text>
								</View>
								<View style={styles.userInfoValueView} >
									<Input
										style={styles.userInfoFieldInput}
										placeholder={translate('LinkedInUrl', locale)}
										defaultValue={person.LinkedInUrl}
										onChangeText={v => this.handleChange('LinkedInUrl', v)}
									/>
								</View>
							</Row>
							{errorShow &&
								errorMessages[10] && (
									<Messages message={errorMessages[10]} />
								)}
						</Grid>

					</View>
				</Content>
			</Container>
		)
	}
}

function mapStateToProps(state) {
	const { counter, auth, organization, rums } = state

	return {
		counter,
		auth,
		rums,
		organizationColor: organization.developerJson,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		rumsActions: bindActionCreators(rumsActions, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InteractRumUpdateScreen)
