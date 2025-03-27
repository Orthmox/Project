x = rnorm(100, mean = 34, sd = 3)
y = rnorm(100, mean = 54, sd = 2)

df = data.frame(x,y)
View(df)

max(df)



options(repos = c(CRAN = "https://cloud.r-project.org/"))

install.packages('rlang')
version
install.packages('installr')

install.packages('ggplot2')
library('ggplot2')
ggplot(df, aes(x = x,y = y)) + geom_point()
View(mtcars)

my_scatplot <- ggplot(mtcars, aes(x=wt,y=mpg)) + geom_point()
my_scatplot + xlab('Weight (x 1000lbs)') + ylab('Miles per Gallon') + geom_smooth()