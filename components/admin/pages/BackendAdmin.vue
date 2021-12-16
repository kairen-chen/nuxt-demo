<template>
    <div class="main">
        <Layout class="main" :style="{padding: '0 50px'}">
            <Content :style="{minHeight: '280px', background: '#fff'}">
                Content
            </Content>            
            <Content >
                <Table :columns="columns1" :data="data1"></Table>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
    layout: 'backend',
    components: {},
    data() {
        return {
            columns1: [{
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [{
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]

        };
    },
};
</script>

<style lang="scss" scoped>

</style>
