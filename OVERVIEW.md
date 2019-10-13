# Schema modelling and data storage
My primary concern with building a tool for schema modelling and data storage would be choosing the right database first and the decision would be driven by a number of factors such as the level of flexibility we want to provide. 

Naturally, SQL database would be my first choice if the primary focus is to make entities highly relational with other entities. On the other hand, if the data entities need to be dynamic but can be self contained without a lot of relationship with other entities, NoSQL db would be my go to tool. 

```
const UserSchema = {
    name: String,
    age: Number,
    email: String,
};
```

In order to facilitate a schema like the above one, in an SQL database, the table would like the following:

#### entity_definitions Table

|id|customer_id|entity|column_name|column_type|validator|
|--|-----------|------|-----------|-----------|----------|
|1|1|user|name|String|name|
|2|1|user|age|Number|number_over_18|
|3|1|user|email|String|email_address|

#### users_<customer_id> Table

|id|name|age|email|
|--|----|---|-----|
|1|foysal|27|foysal@bdgeeks.com|

Now, different customers can ask for different fields in their user entity, in which case, we would have to create different users tables for different customers. it can get more complicated to setup *migrations* to facilitate schema updates. However, this design helps us take advantage of db specific indexing and other performance gains.

The other option is to store data for different schemas for one entity form all customers within one table in *key-value* model like below:

#### users Table

|id|customer_id|column_name|column_value|
|--|-----------|-----------|------------|
|1|1|id|some-long-uuid-or-int-ids-are-fine-too|
|2|1|name|foysal|
|3|1|age|27|
|4|1|email|foysal@bdgeeks.com|

However, with this design it would be very hard to add relationships, pagination or indexing.


With NoSQL databases, not having schema restrictions, it would be much easier to use one collection to house same type of schema from different customers. It would also allow changing the schema quite easily since migration becomes as simple as overwriting the keys of stored objects. However, it also makes modeling relations with entities more challenging, especially if dynamic schema is considered and results in a lot of custom `agregate` queries. 

An example collection structure is shown below:

#### entityDefinitions Collection
```
{
    _id: <objectId>,
    customerId: <objectId>,
    entity: 'user',
    definition: {
        name: {
            type: 'string',
            validator: 'name',
        },
        age: {
            type: 'number',
            validator: 'number_over_18',
        },
        email: {
            type: 'string',
            validator: 'email_address',
        },
    }
}
```

#### users Collection
```
{
    _id: <objectId>,
    customerId: <objectId>,
    name: 'foysal',
    age: 27,
    email: 'foysal@bdgeeks.com',
}
```

Another major concern, I think, should be dynamic schema validation. Having a set of validators is probably fine for basic data structures such as email address, ip address, address, phone number etc. However, giving the customers a way to define their own validators would be a challenging but fun problem to solve. 

An interesting feature with schema modelling can be, using something like faker.js, giving the users a live preview of an entity as they build the schema to ensure that they have a visual understanding of how their data would look like for the schema they are building

# Custom page creation
I would start with predefined modules where our system will provide a number of configurable building blocks that can be drag-n-dropped. Something like notion comes to mind as an example where every line can be a block. With that approach, I think the implementation would be client heavy. The client app will have a few generic shell components defined as blocks i.e: data list from collection block, stats from collection block, todo list block, CRUD operation block for collection etc.

Once the page is built and saved, the page info along with the related blocks will be saved in the database. Now, on the client, when the page is rendered, each block will know which server endpoint to communicate with based on the configuration and act accordingly.

Couple examples to discuss the block implementation:
- **CRUD operation for collection**: When building, the customer can define which collection/schema the block is connected to. The block will automatically provide an interface for viewing, creating, updating and removing entries from that collection using the dynamic server endpoint that can facilitate such actions for any given schema;
- **Todo list block**: A generic todo list module will be built on the server that can house multiple lists with relational information such as which customer the list belongs to, who has access to it, which page it should show up on. When creating the page, the customer will configure the block to connect to one of the existing todo lists or create a new one. 

Couple of features I can think of:

- Pages can, optionally, have access control so that a certain page can only be made available to certain users within a company. 
- Pages can be added to the main navigation for easier access.
- Page url can be customized with certain ruleset.


# Simple user-editable workflows
Honestly, I have never had to build such a thing so my understanding of the concept itself might be shaky let alone the implementation approach I'm proposing. You have been warned.

From my understanding, workflows are heavily event based so some kind of pub-sub mechanism need to be in place to facilitate listening to various events being thrown around from various actions performed by users/webhooks/cronjobs etc. So, to start with, actions such as new entry being added to a schema, a todo list item being marked complete, a new page being created would have to emit an event. It can be as simple as node's `EventEmitter` or more complex like a message queue based on redis. 

Knowing what kind of events the system is emitting, we would provide the customers a list of configurable blocks consisting of available events. Then a list of actions could be built such as: sending an email, marking a todo item as complete, updating/removing/creating an entry in a schema etc. 

With both building blocks in place, we would let the customers connect events with actions through a visual editor to create their own workflows. The trigger for a workflow should be configurable as well i.e: an event can trigger an entire workflow or they can run in a periodic manner through cronjobs and for that to work, each event emitted from the system would trigger a check to see if any workflow is supposed to kicked off for that event and do so if needed.

I would assume the customers would want to pause, resume, archive workflows and atomicity and availability of the data storage for workflow related data can pose a problem in that regard.

At a complex level, workflows might need to be modular enough to be reused so that when building a workflow, other workflows can be integrated within it.