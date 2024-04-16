import { StyleSheet } from 'react-native';

// purple theme
const COLORS = {
  backgroundColor1: '#18111B',
  backgroundColor2: '#1E1523',
  interactiveColor1: '#301C3B',
  interactiveColor2: '#3D224E',
  interactiveColor3: '#48295C',
  borderColor1: '#54346B',
  borderColor2: '#664282',
  borderColor3: '#8457AA',
  solidColor1: '#8E4EC6',
  solidColor2: '#9A5CD0',
  textColor1: '#D19DFF',
  textColor2: '#ECD9FA',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.backgroundColor1,
  },
  cardsContainer: {
    paddingVertical: 16,
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.interactiveColor2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textColor2,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.interactiveColor1,
    color: COLORS.textColor2,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  buttonContainer: {
    backgroundColor: COLORS.interactiveColor3,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.textColor1,
    fontSize: 16,
  },
  headerButton: {
    marginRight: 15,
  },
});

export default styles;
export { COLORS };
