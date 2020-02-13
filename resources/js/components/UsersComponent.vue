<template>
    <div class="container-fluid">
        <div class="row mt-3">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">All Clients list</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add New <i class="fas fa-user-plus" ></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover text-nowrap">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Signup Date</th>
                                <th>Type</th>
                                <th>Comment</th>
                                <th>Control</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{ user.id }}</td>
                                <td>{{ user.name | upperCase }}</td>
                                <td>{{ user.email | miniCase }}</td>
                                <td><span class="tag tag-success">{{ user.created_at | moment }}</span></td>
                                <td>{{ user.type | type }}</td>
                                <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                <td>
                                    <a href="#" alt="Edit user"><i class="fas fa-user-edit m-2 blue"></i></a>
                                    <a href="#" alt="Disable user"><i class="fas fa-thumbs-down m-2 orange"></i></a>
                                    <a href="#" alt="Delete user"><i class="fas fa-trash-alt m-2 red"></i></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel">Create a new user</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Full Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email" placeholder="Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>

                            <div class="form-group">
                                <textarea v-model="form.bio" id="bio" name="bio" placeholder="Your short bio (optional)"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                                </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <select v-model="form.type" type="text" id="type" name="type"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="5">Administrator</option>
                                    <option value="1">Editor</option>
                                    <option value="0" selected>Standard User</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password" placeholder="Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                            <div class="form-group bg-gradient-red">
                                <textarea v-model="form.admin_comment" id="admin_comment" name="admin_comment" placeholder="The Admins' comment (optional)"
                                          class="form-control red accent-red" :class="{ 'is-invalid': form.errors.has('admin_comment') }">
                                </textarea>
                                <has-error :form="form" field="admin_comment"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-info" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success">Create User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from "vform/src/Form";
    import * as Toast from "sweetalert2";

    export default {
        data() {
            return {
                users: {},
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    admin_comment: '',
                    bio: '',
                    photo: '',
                })
            }
        },
        methods: {
            loadUsers() {
                axios.get('api/user').then(({data}) => (this.users = data.data));
            },

            createUser() {
                this.$Progress.start();
                this.form.post('api/user')
                .then(()=>{
                    Fire.$emit('refreshUsers');
                    $('#addNew').modal('hide');
                    Toast.fire({
                        icon: 'success',
                        title: 'Created successfully'
                    });
                    this.$Progress.finish();
                })
                .catch(() => {

                })
            },
        },
        created() {
            this.loadUsers();
            Fire.$on('refreshUsers', () => { this.loadUsers(); });
            /* setInterval(() => this.loadUsers(), 3000); */
        }
    }
</script>
