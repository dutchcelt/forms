export default fieldData => {
    const messageElement = fieldData.parent.querySelector('p');
    const p = messageElement || document.createElement('p');
    p.innerHTML = fieldData.errors || '';
    !messageElement && fieldData.parent.appendChild(p);
}

