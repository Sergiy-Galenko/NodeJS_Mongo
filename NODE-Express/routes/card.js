const { Router } = require("express");
const Course = require("../models/course");
const router = Router();

function mapCartItmes(cart) {
    return cart.itmes.map((c) => ({
        ...c.courseId._doc,
        count: c.count,
    }));
}

function mapCartPrice(courses) {
    return courses.reduce((tital, course) => {
        return (tital += course.price * course.count);
    }, 0);
}

router.post("/add", async (req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course);
    res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
    const card = await Card.remove(req.params.id);
    res.status(200).json(card);
});

router.get("/", async (req, res) => {
    const user = await req.user.populate("cart.items.courseId").execPopulate();
    const courses = mapCartItmes(user.cart);

    res.render("card", {
        title: "Корзина",
        isCard: true,
        courses: courses,
        price: mapCartPrice(courses),
    });
});

module.exports = router;
