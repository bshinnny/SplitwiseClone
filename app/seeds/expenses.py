from app.models import db, Expense, environment, SCHEMA


def seed_expenses():
    expense1= Expense(
        description = "KFC dinner",
        user_id = 1,
        group_id = 2,
        recipient_id =3,
        amount = 100,
        note = "with David",
        status = False
    )

    expense2= Expense(
        description = "tour in Vegas",
        user_id = 2,
        group_id = 1,
        recipient_id =1,
        amount = 589,
        note = "one day tour with Lisa",
        status = True
    )

    expense3= Expense(
        description = "nail salon",
        user_id = 3,
        #if there is no group????
        recipient_id =6,
        amount = 267,
        note = "paied for your nail polish",
        status = False
    )

    expense4= Expense(
        description = "Chinese Supermarket shopping bill",
        user_id = 6,
        group_id = 1,
        recipient_id =4,
        amount = 1367,
        note = "split with 4 people",
        status = False
    )

    expense5= Expense(
        description = "Uber fee",
        user_id = 5,
        #if there is no group????
        recipient_id =1,
        amount = 367,
        note = "uber from LA to Vegas",
        status = False
    )

    expense6= Expense(
        description = "buffet in LA",
        user_id = 3,
        group_id = 4,
        recipient_id =4,
        amount = 1478,
        note = "Can you guys pay it before tonight?",
        status = False
    )

    db.session.add(expense1)
    db.session.add(expense2)
    db.session.add(expense3)
    db.session.add(expense4)
    db.session.add(expense5)
    db.session.add(expense6)
    db.session.commit()


def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expenses")

    db.session.commit()
