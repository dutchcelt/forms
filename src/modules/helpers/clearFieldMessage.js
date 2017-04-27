export default fieldData => {
    const messageElement = fieldData.parent.querySelector('p');
    messageElement && fieldData.parent.removeChild(messageElement);
}
