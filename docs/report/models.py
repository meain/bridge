 class Subject(models.Model):
    subject_code = models.CharField(\
            verbose_name="Subject Code", max_length=6,\
            primary_key=True)
    subject_title = models.CharField(\
            max_length=60, verbose_name="Subject Title")
    subject_short_name = models.CharField(\
            max_length=3, verbose_name="Abbriviation")
    subject_dep = models.ForeignKey('Department',\
            on_delete=models.CASCADE, verbose_name="Branch")
    subject_sem = models.SmallIntegerField(\
            choices=sem_choices, null=True)

    def __str__(self):
        return self.subject_title


class Teacher(models.Model):
    teacher_name = models.CharField(max_length=40)
    dept = models.ForeignKey('Department', \
            on_delete=models.CASCADE)
    subjects = models.ManyToManyField('Subject', \
            verbose_name="Subjects")

    def __str__(self):
        return self.teacher_name


class Class(models.Model):
    current_sem = models.PositiveSmallIntegerField(\
            choices=sem_choices)
    branch = models.ForeignKey('Department', \
            on_delete=models.CASCADE)
    batch = models.CharField(max_length=1)
    class_name = models.CharField(max_length=10, blank=True)
    timeTable = models.TextField()
    subjects = models.ManyToManyField('Subject', \
            verbose_name='Subjects', through='TaughtBy')

    def save(self, *args, **kwargs):
        self.class_name = str(self.branch) + " " + \
                str(self.current_sem) + str(self.batch)
        super(Class, self).save(*args, **kwargs)

    def get_subs(self):
        subs = [subject.subject_short_name for subject \
                in self.subjects.all()]
        return subs

    def get_tt(self):
        tt_string = str(self.timeTable)
        tt_string = tt_string.splitlines()
        days = ['monday', 'tuesday', 'wednesday',
                'thursday', 'friday']
        tt_dict = {}
        for i in range(5):
            tt_dict[days[i]] = tt_string[i]

        return tt_dict

    def __str__(self):
        return str(self.class_name)

    class Meta:
        verbose_name_plural = "Classes"
