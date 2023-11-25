let self = module.exports = {
        userRegister : async function(req, res) {
            const currentDate = new Date();
            const { username, password, email, nama, address, phone_number } =
                req.body
                const userData = {
                username,
                password,
                email,
                nama,
                address,
                // rubah di database jadi type data string
                phone_number: `+62${phone_number}`,
                created_at: currentDate,
                updated_at: currentDate,
                }
                const getUser = await query.select('user', {username: username})
                const getUserEmail = await query.select('user', {email: email})
                // validasi max char password dan username
                // validasi password requirement hurup kecil besar, simbol, spasi,
                // +62 added default
                if (getUser.length > 0 || getUserEmail.length > 0) {
                    response.ERROR(res, {status: 'failed', message: 'username sudah terdaftar', data: []})
                } else {
                    await query.insert('user', userData)
                    response.CREATED(res, {status: 'success', message: 'regist berhasil', data: userData})  
                }
        },

        userLogin: async function(req, res){
            const { username, password } = req.body
            console.log(username, password);
            
            const getUser = await query.select('user', { username })
            if (getUser.length > 0) {
                if (getUser[0].password === password) {
                    response.OK(res, { status: 'Success', message: 'Login berhasil', data: getUser })
                } else {
                    response.NOTFOUND(res, { status: 'Failed', message: 'Password tidak sesuai', data: [] })
                }
            } else {
                response.ERROR(res, { status: 'Failed', message: 'Login gagal', data: [] })
            }
        },

        userUpdate: async function (req, res) {
            const user_id = req.params.id
            const {username, password, email, nama, address, phone_number } = req.body
            const currentDate = new Date()
            // validasi max char password dan username
                // validasi password requirement hurup kecil besar, simbol, spasi,
                // +62 added default
            if (username.length >= 15 || password.length >= 20) {
                response.ERROR(res, { status: 'Failed', message: 'Maksimum karakter username 15 dan password 8 dan nama 35', data: [] })
            } else {
                const getUser = await query.select('user', {user_id: user_id })
        
                if (getUser.length > 0) {
                    const insertUser = {user_id: user_id, username, password, email, nama, address, phone_number, updated_at: currentDate}
        
                    await query.update('user', insertUser, { user_id})
                    response.OK(res, { status: 'success', message: 'Update berhasil', data: insertUser })
                } else {
                    response.NOTFOUND(res, { status: 'Failed', message: 'Email tidak ditemukan', data: [] })
                }
            }
        },
}