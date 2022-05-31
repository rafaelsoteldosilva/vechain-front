#
Function for Url:

function ValidUrl(myUrl) {
    var validUrlRedEx = /https?:\/\/(www\.)?[-a-zA-Z0-9\@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()\@:%_\+.~#?&//=]*)/
 
    return validUrlRedEx.test(myUrl.trim());
}

const ConsoleLog = (data) => {
    return (
        <React.Fragment>
            <h5 style={{ marginTop: '60px' }}>{JSON.stringify(data)}</h5>
        </React.Fragment>
    );
};

- Delete VideoCategories