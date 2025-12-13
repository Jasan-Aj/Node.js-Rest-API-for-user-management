
export const createUserValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: "username cant be empty!"
        },
        isLength: {
            option: {min:2, max:10},
            errorMessage: "user name must between 2 and 10"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "password cant be empty"
        }
    }
}