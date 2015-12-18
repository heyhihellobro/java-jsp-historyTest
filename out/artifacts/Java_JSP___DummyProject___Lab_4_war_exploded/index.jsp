<%@ page import="java.util.Objects" %>
<% int counter = 0; %>
<%--
  Created by IntelliJ IDEA.
  User: heyhihello
  Date: 21.11.2015
  Time: 20:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Результаты</title>
    <link rel="stylesheet" href="css/libs/bootstrap.min.css">
    <link rel="stylesheet" href="css/libs/font-awesome.css">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
  <section class="test">
    <div class="container">
      <div class="row">
        <h1>Результаты тестирования</h1>

        <div class="logo">
          <img src="images/logo.png">
        </div>
        <div class="col-md-6 col-md-offset-3">

          <%
              try {
            /* Question 1 */
                  String answer_1[] = request.getParameterValues("q1_1");

                  if (Objects.equals(answer_1[0], "q1_3")) {
                      out.println("<p style='color: green;'>1. Вы ответили правильно!</p>");
                      counter++;
                  } else {
                      out.println("<p style='color: red;'>1. Вы ответили неправильно!</p>");
                  }
              } catch (NullPointerException e) {
                  out.println("<p style='color: red;'>1. Вы ответили неправильно!</p>");
              }


        /* Question 2 */
            if (Objects.equals(request.getParameter("q_2"), "1861")) {
              out.println("<p style='color: green;'>2. Вы ответили правильно!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>2. Вы ответили неправильно!</p>");
            }


        /* Question 3 */
            if (request.getParameter("q3_1") != null && request.getParameter("q3_4") != null) {
              out.println("<p style='color: green;'>3. Вы полностью ответили правильно!</p>");
              counter+=2;
            } else if (request.getParameter("q3_1") != null || request.getParameter("q3_4") != null) {
              out.println("<p style='color: green;'>3. Вы отметили только 1 пункт из двух!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>3. Вы ответили неправильно!</p>");
            }


        /* Question 4 */
            if(Objects.equals(request.getParameter("q_4"), "Ð\u009DÐµÐ²Ñ\u0081ÐºÐ°Ñ\u008F Ð±Ð¸Ñ\u0082Ð²Ð°")) {

              out.println("<p style='color: green;'>4. Вы ответили правильно!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>4. Вы ответили неправильно!</p>");
            }

        /* Question 5 */
            if (request.getParameter("q5_2") != null && request.getParameter("q5_4") != null) { %>
              <p style='color: green;'>5. Вы полностью ответили правильно!</p>
            <%
              counter+=2;
            } else if (request.getParameter("q5_2") != null || request.getParameter("q5_4") != null) {
              out.println("<p style='color: green;'>5. Вы отметили только 1 пункт из двух!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>5. Вы ответили неправильно!</p>");
            }

        /* Question 6 */
            if(Objects.equals(request.getParameter("q_6"), "#ff0000")) {
              out.println("<p style='color: green;'>6. Вы ответили правильно!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>6. Вы ответили неправильно!</p>");
            }

        /* Question 7 */
            if(Objects.equals(request.getParameter("q_7"), "1941-06")) {
              out.println("<p style='color: green;'>7. Вы ответили правильно!</p>");
              counter++;
            } else {
              out.println("<p style='color: red;'>7. Вы ответили неправильно!</p>");
            }

            out.println("<p style='color: red;'>Вы набрали: " + counter + " баллов</p>");

            switch (counter) {
              case 1:
                out.println("Ваша оценка 1");
                break;
              case 2:
                out.println("Ваша оценка 2");
                break;
              case 3:
                out.println("Ваша оценка 3");
                break;
              case 4:
                out.println("Ваша оценка 4");
                break;
              case 5:
                out.println("Ваша оценка 5");
                break;
              case 6:
                out.println("Ваша оценка 6");
                break;
              case 7:
                out.println("Ваша оценка 7");
                break;
              case 8:
                out.println("Ваша оценка 8");
                break;
              case 9:
                out.println("Ваша оценка 9");
                break;
              case 10:
                out.println("Ваша оценка 10");
                break;
              default:
                out.println("Упси");
            }


            out.println(" <br> Хотите получить еще один бал ответив на дополнительный вопрос?");
            out.println(" <br> <a class='btn btn-success' href='http://localhost:8080/more.html'>Да</a>");

           %>

        </div>
      </div>
    </div>
  </section>
  </body>
</html>
