export const insertStaff = (staff, navigate) => async (dispatch) => {
    //const service = new StaffService()

    try {
        console.log('insert staff');
    } catch (error){
        console.log('Error' + error)
    }

    navigate("/staffs/list");
};
