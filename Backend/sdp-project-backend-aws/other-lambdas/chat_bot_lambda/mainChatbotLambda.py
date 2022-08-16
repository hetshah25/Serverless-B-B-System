"""
This sample demonstrates an implementation of the Lex Code Hook Interface
in order to serve a sample bot which manages reservations for hotel rooms and car rentals.
Bot, Intent, and Slot models which are compatible with this sample can be found in the Lex Console
as part of the 'BookTrip' template.

For instructions on how to set up and test this bot, as well as additional samples,
visit the Lex Getting Started documentation http://docs.aws.amazon.com/lex/latest/dg/getting-started.html.
"""

import json
import datetime
import time
import os
import dateutil.parser
import logging
import boto3
import string
import uuid
import random
from re import search
import decimal
import datetime
from datetime import datetime


dynamodb = boto3.client('dynamodb')
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)


# --- Helpers that build all of the responses ---



def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }


def confirm_intent(session_attributes, intent_name, slots, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ConfirmIntent',
            'intentName': intent_name,
            'slots': slots,
            'message': message
        }
    }


def close(fulfillment_state, message):
    response = {
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response


def delegate(session_attributes, slots):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }


# --- Helper Functions ---


def safe_int(n):
    """
    Safely convert n value to int.
    """
    if n is not None:
        return int(n)
    return n


def try_ex(func):
    """
    Call passed in function in try block. If KeyError is encountered return None.
    This function is intended to be used to safely access dictionary.

    Note that this function would have negative impact on performance.
    """

    try:
        return func()
    except KeyError:
        return None





# --- Intents ---


def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """

    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))

    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers

    if intent_name == 'foodintent':
        return order_food(intent_request)
    if intent_name == 'roombooking':
        return room_booking(intent_request)
    if intent_name == 'navigate':
        return navigationTo(intent_request)
    if intent_name == 'Roominq':
        return roomEnquiry(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')


# --- Main handler ---

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def roomEnquiry(intent_request):
    slots = intent_request['currentIntent']['slots']
    roomType = slots["roomType"]
    
    tempRoomType = roomType.lower()
    print(tempRoomType)
    mainRoomType = "--"
    

    if 'stand' in tempRoomType:
        mainRoomType = 'Standard Room'
        
    
    if 'delux' in tempRoomType:
        mainRoomType = 'Delux Room'
    
    if 'suit' in tempRoomType:
        mainRoomType = 'Suite Room'
    
    dynamo = boto3.resource('dynamodb', region_name='us-east-1')
    tbl = dynamo.Table("roomavailability")
    response = tbl.scan()
    repo_lists = []
    count : decimal = 0
    
    for item in response['Items']:
        if item['type'] == mainRoomType:
            if(item['count'] == 0):
                return close(
                    'Fulfilled',
                    {
                        'contentType': 'PlainText',
                        'content':  mainRoomType + ' is not available you can book other types of rooms as well'
                    }
                )
    return close(
        'Fulfilled',
        {
            'contentType': 'PlainText',
            'content': 'Your requested room is available'
        }
    )
    
def room_booking(intent_request):
    slots = intent_request['currentIntent']['slots']
    date = slots['date']
    person = slots['person']
    roomType = slots['roomType']
    noOfAdult = slots['adults']
    noOfChild = slots['child']
    petStatus = slots['pets']
    name = slots['fname']
    email = slots['email']
    noOfDays = slots['days']
    petStatus = slots['pets']
    
    dynamo = boto3.resource('dynamodb', region_name='us-east-1')
    userTable = dynamo.Table('user-customers')
    resp = userTable.scan()
    
    print(resp["Items"])
    flag = 0
    customerId = '----'
    for x in resp["Items"]:
        print(x["emailId"])
        if x["emailId"] == email:
            flag = 1
            print('+++++++++++++++++++++++++++++++++++++++')
            print(x["customerNo"])
            customerId = x["customerNo"]
            
    if flag == 0:
        return close(
            'Fulfilled',
            {
                'contentType': 'PlainText',
                'content': 'Sorry we didnt find any account link with this email address, Please Register with your email...'
            }
         ) 
    
    
    uniqueId = get_random_string(20)
    sampleText = ""
    if petStatus.find("no") == -1:
        sampleText = "true"
    else:
        sampleText = "false"
    
    
    letSplit = date.split("-")
    print(letSplit)
    d = (int(letSplit[2]))
    d = d + int(noOfDays)

    
    checkOutDate = str(letSplit[0]) + "-" + str(letSplit[1])+ "-" + str(d)
    print(checkOutDate)
    
    tempRoomType = roomType.lower()
    print(tempRoomType)
    mainRoomType = "--"
    total = 0;

    if 'stand' in tempRoomType:
        mainRoomType = 'Standard Room'
        total = 99
    
    if 'delux' in tempRoomType:
        total = 199
        mainRoomType = 'Delux Room'
    
    if 'suit' in tempRoomType:
        total = 249
        mainRoomType = 'Suite Room'

    print('&7&&&&&&&&&&&&&&')
    print(mainRoomType)
    
    total = total * int(noOfDays)
    
    
    #end_date = date_1 + datetime.timedelta(days=str(noOfDays))
    
    #print(type(date))
    #print(end_date)
    #end_date = date + datetime.timedelta(days=int(noOfDays))
    #print('-------------' + end_date)
    
    #table = boto3.resource('dynamodb').Table('my_table')
    #table.update_item(
     #   Key={'pkey': 'asdf12345'},
      #  AttributeUpdates={
       #     'status': 'complete',
        #    },
        #)
        
    #dynamodb.put_item(TableName='roombooking', Item={'id':{'S':uniqueId},'Date':{'S':date} , 'NoOfPerson' : {'N' : person} , "RoomType" : {'S' : roomType} , "Name" : {'S' : name} , "Email" : {'S' : email} , "Days" : {'N' : noOfDays } , "NoOfAdult" : {'S' : noOfAdult} , "PetStatus" : {'S' : sampleText} , "No Of Days" : {'N' : noOfDays} , "No of Child" : {'N' : noOfChild}})
    dynamodb.put_item(TableName='room-bookings' , Item={'id' : {'S' : uniqueId} , 'price' : {'S' : str(total) } , 'customerNo' : {'S' : str(customerId)} , 'roomType' : {'S' : mainRoomType} , 'address' : {'S' : 'Halifax,NS'} , 'adults' : {'N' : noOfAdult}, 'children' : {'N' : noOfChild } , 'email' : {'S' : email} , 'enddate' : {'S' : checkOutDate} , 'name' : {'S' : name} , 'phone' : {'S' : '999999999'}, 'startdate' : {'S' : date}})
    dynamo = boto3.resource('dynamodb', region_name='us-east-1')
    tbl = dynamo.Table("roomavailability")
    response = tbl.update_item(
                Key={
                    'type' : mainRoomType
                },
                UpdateExpression="set #count = #count- :val",
                ExpressionAttributeNames={
                    '#count': 'count',
                },
                ExpressionAttributeValues={
                    ':val': decimal.Decimal(1)
                },
                ReturnValues="UPDATED_NEW"
    )
    
    region_name = os.environ['AWS_REGION']
    
    client = boto3.client("lambda", region_name = region_name)
    payload = {"customerId" : customerId , "startdate" : date , "noOfDays" : noOfDays , "price" : total , "end_date" : checkOutDate , "roomType" : mainRoomType}
    resp = client.invoke(FunctionName="logBooking" , InvocationType="Event", Payload=json.dumps(payload))
    
    return close(
        'Fulfilled',
        {
            'contentType': 'PlainText',
            'content': 'Your ' + mainRoomType + ' is booked for you for ' + person + ' person and on date :- ' + date + ". Your checkout Date is " + str(checkOutDate)
        }
    )

def order_food(intent_request):
    slots = intent_request['currentIntent']['slots']
    name = slots["name"]
    #email = slots["email"]
    foodName = slots["foodname"]
    quantity = slots["quantity"]
    phone = slots["phone"]
    email = slots["email"]
    #size = slots["size"]
    instructions = slots["instructions"]
    addre = slots["address"]
    deliveryType = slots["deliveryType"]
    
    tempCheck = deliveryType.lower()
    tempstrforadd = ''
    tempstrforroom = ''
    
    if search(tempCheck , 'home'):
        tempstrforadd = addre
        tempstrforroom = '---'
    
    if search(tempCheck , 'room'):
        tempstrforadd = '---'
        tempstrforroom = addre
    
    uniqueId = get_random_string(20)
    #size = size.lower()
    trialString = "sss"
    #size = size.lower()
    
    
    total = 0
    tempfoodName = "---"
    tempName = foodName.lower()
    if search(tempName , 'burger'):
        tempfoodName = "Burger"
        total = 5
    if search(tempName , 'pizza'):
        tempfoodName = "Pizza"
        total = 15
    if search(tempName , 'pasta'):
        tempfoodName = "Pasta"
        total = 10
    
    total = total * int(quantity)

    
    print('--------' + str(total))
    
    region_name = os.environ['AWS_REGION']
    client = boto3.client("lambda", region_name = region_name)
    payload = {'email' : email , 'item' : tempfoodName , 'quantity' : int(quantity) , 'price' : total }
    resp = client.invoke(FunctionName="logorder" , InvocationType="Event", Payload=json.dumps(payload))
    
    dynamodb.put_item(TableName='food-order' , Item={'id' : {'S' : uniqueId} , 'email' : {'S' : email} , 'address' : {'S' : tempstrforadd} , 'instructions' : {'S' : instructions} , 'item' : {'S' : tempfoodName} , 'phone' : {'S' : str(phone)} , 'qty' : {'S' : quantity} , 'price' : {'S' :str(total) } , 'roomnumber' : {'S' : tempstrforroom}})
    #dynamodb.put_item(TableName='foodorders', Item={'Name' : {'S' : name} , 'Email' : {'S': email } , 'price' : {'S' : str(total)} , 'id':{'S':uniqueId},'FoodName':{'S':foodName} , 'Size' : {'S' : trialString} , "Quantity" : {'S' : quantity} , "Instruction" : {'S' : instructions}})
    return close(
        'Fulfilled',
        {
            'contentType': 'PlainText',
            'content':  ' Your order of ' + quantity + ' ' + tempfoodName +' will be ready in 10 min.'+ ' Total Bill :- $' + str(total)  +'. Thank you for using chatbot.'
        }
    )

#orderFood tourInfo roomBooking home
def navigationTo(intent_request):
    slots = intent_request['currentIntent']['slots']
    print(slots)
    SampleText = "Nothing"
    destination = slots['destination']
    destination = destination.lower()
    if search(destination , "orderFood"):
        SampleText = "Order Food Link"
    if search(destination , "tourInfo"):
        SampleText = "Tour Info Link"
    if search(destination , "roomBooking"):
        SampleText = "Room Booking Link"
    if search(destination , "home"):
        SampleText = "Home Page Link"
    return close(
        'Fulfilled',
        {
            'contentType': 'PlainText',
            'content': destination
        }
    )


def lambda_handler(event, context):
    """
    Route the incoming request based on intent.
    The JSON body of the request is provided in the event slot.
    """
    # By default, treat the user request as coming from the America/New_York time zone.
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    logger.debug('event.bot.name={}'.format(event['bot']['name']))

    return dispatch(event)
