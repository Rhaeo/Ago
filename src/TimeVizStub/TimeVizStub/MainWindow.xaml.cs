using System;
using System.Windows;

namespace TimeVizStub
{
    public class Task
    {
        public DateTimeOffset? CantBeginBefore { get; }
        public DateTimeOffset? MustEndBefore { get; }
        public DateTimeOffset? DidBeginAt { get; }
        public DateTimeOffset? DidEndAt { get; }
        public TimeSpan? ExpectedDuration { get; }
        public TimeSpan? ExpectedDurationConfidence { get; }
    }

    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
    }
}
